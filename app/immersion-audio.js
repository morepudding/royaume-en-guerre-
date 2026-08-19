const THEMES = {
  plain: { root: 146.83, tempo: 760, notes: [1, 1.2, 1.5, 1.8, 2, 1.5] },
  river: { root: 130.81, tempo: 840, notes: [1, 1.5, 1.8, 1.2, 2, 1.5] },
  mountains: { root: 110, tempo: 920, notes: [1, 1.33, 1.5, 2, 1.5, 1.33] },
  valley: { root: 123.47, tempo: 790, notes: [1, 1.2, 1.5, 2, 1.8, 1.5] },
  marsh: { root: 98, tempo: 980, notes: [1, 1.5, 1.2, 1.8, 1.33, 1.2] },
};

export function createImmersionAudio() {
  let context;
  let master;
  let music;
  let sfx;
  let timer;
  let drone = [];
  let step = 0;
  let muted = false;
  let paused = false;
  let intensity = 0.25;
  let theme = THEMES.plain;

  const ensure = () => {
    if (context) return context;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    context = new AudioContext();
    master = context.createGain();
    music = context.createGain();
    sfx = context.createGain();
    master.gain.value = muted ? 0 : 0.72;
    music.gain.value = 0.085;
    sfx.gain.value = 0.42;
    music.connect(master);
    sfx.connect(master);
    master.connect(context.destination);
    return context;
  };

  const resume = () => {
    const ctx = ensure();
    if (ctx?.state === "suspended") ctx.resume().catch(() => undefined);
    return ctx;
  };

  const oscillator = (frequency, duration, volume, type = "triangle", destination = sfx, delay = 0) => {
    const ctx = resume();
    if (!ctx || muted) return;
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(35, frequency), start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(destination);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  };

  const noise = (duration, volume, delay = 0) => {
    const ctx = resume();
    if (!ctx || muted) return;
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    filter.type = "lowpass";
    filter.frequency.value = 1050;
    gain.gain.value = volume;
    source.buffer = buffer;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(sfx);
    source.start(ctx.currentTime + delay);
  };

  const stopDrone = () => {
    drone.forEach(({ osc, gain }) => {
      try {
        gain.gain.setTargetAtTime(0.0001, context.currentTime, 0.3);
        osc.stop(context.currentTime + 1);
      } catch {}
    });
    drone = [];
  };

  const startDrone = () => {
    const ctx = resume();
    if (!ctx || muted) return;
    stopDrone();
    [0.5, 0.75].forEach((ratio, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = index ? "triangle" : "sine";
      osc.frequency.value = theme.root * ratio;
      filter.type = "lowpass";
      filter.frequency.value = 420;
      gain.gain.value = index ? 0.018 : 0.028;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(music);
      osc.start();
      drone.push({ osc, gain });
    });
  };

  const scheduleMusic = () => {
    if (muted || paused || !context || context.state !== "running") return;
    const ratio = theme.notes[step % theme.notes.length];
    const accent = step % 4 === 0;
    oscillator(theme.root * ratio * 2, 0.42, 0.016 + intensity * 0.012, "triangle", music);
    if (accent) oscillator(theme.root * (intensity > 0.62 ? 1 : 0.5), 0.7, 0.014, "sine", music);
    step++;
  };

  const startBattle = (terrain = "plain", mode = "conquest") => {
    theme = THEMES[terrain] || THEMES.plain;
    if (["defense", "boss", "dawn"].includes(mode)) theme = { ...theme, tempo: Math.max(580, theme.tempo - 140) };
    step = 0;
    paused = false;
    resume();
    clearInterval(timer);
    startDrone();
    scheduleMusic();
    timer = window.setInterval(scheduleMusic, theme.tempo);
  };

  const play = (event) => {
    if (muted) return;
    switch (event) {
      case "select": oscillator(260, 0.07, 0.07); break;
      case "launch": oscillator(420, 0.09, 0.09); oscillator(560, 0.08, 0.05, "triangle", sfx, 0.045); break;
      case "invalid": oscillator(105, 0.18, 0.11, "square"); break;
      case "impact": noise(0.18, 0.16); oscillator(88, 0.22, 0.12, "sawtooth"); break;
      case "clash": noise(0.28, 0.2); oscillator(72, 0.3, 0.14, "sawtooth"); oscillator(145, 0.15, 0.08, "square", sfx, 0.04); break;
      case "capture": [392, 523.25, 659.25].forEach((note, i) => oscillator(note, 0.32, 0.085, "triangle", sfx, i * 0.075)); break;
      case "loss": [220, 164.81, 110].forEach((note, i) => oscillator(note, 0.38, 0.075, "sawtooth", sfx, i * 0.08)); break;
      case "wave": oscillator(73.42, 0.65, 0.13, "sawtooth"); oscillator(98, 0.65, 0.1, "square", sfx, 0.18); break;
      case "magic": [293.66, 440, 587.33].forEach((note, i) => oscillator(note, 0.48, 0.065, "sine", sfx, i * 0.06)); break;
      case "repair": noise(0.12, 0.1); oscillator(196, 0.18, 0.08, "square"); oscillator(392, 0.35, 0.08, "triangle", sfx, 0.13); break;
      case "saved": oscillator(523.25, 0.18, 0.07); oscillator(783.99, 0.34, 0.065, "sine", sfx, 0.08); break;
      case "betrayal": oscillator(246.94, 0.55, 0.08, "sawtooth"); oscillator(116.54, 0.8, 0.11, "sine", sfx, 0.1); break;
      case "victory": [293.66, 369.99, 440, 587.33].forEach((note, i) => oscillator(note, 0.7, 0.09, "triangle", sfx, i * 0.14)); break;
      case "defeat": [220, 185, 146.83, 110].forEach((note, i) => oscillator(note, 0.85, 0.085, "sawtooth", sfx, i * 0.16)); break;
    }
  };

  return {
    unlock: resume,
    startBattle,
    play,
    setIntensity(value) {
      intensity = Math.max(0, Math.min(1, value));
      if (music && context) music.gain.setTargetAtTime(0.065 + intensity * 0.055, context.currentTime, 0.4);
    },
    setMuted(value) {
      muted = value;
      if (!master || !context) return;
      master.gain.setTargetAtTime(value ? 0.0001 : 0.72, context.currentTime, 0.08);
      if (!value && !paused) {
        resume();
        if (!drone.length) startDrone();
      }
    },
    pause() {
      if (paused) return;
      paused = true;
      clearInterval(timer);
      timer = undefined;
      stopDrone();
    },
    resumeBattle() {
      if (!paused) return;
      paused = false;
      resume();
      startDrone();
      clearInterval(timer);
      scheduleMusic();
      timer = window.setInterval(scheduleMusic, theme.tempo);
    },
    stop() {
      paused = false;
      clearInterval(timer);
      timer = undefined;
      stopDrone();
    },
  };
}
