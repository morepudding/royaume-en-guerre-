"use client";

import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createImmersionAudio } from "./immersion-audio";

const r = { Fragment, jsx, jsxs };
const t = React;

let n = (e, r, t, n, s, a, l, i) => ({
    id: e,
    x: r,
    y: t,
    owner: n,
    units: s,
    kind: a,
    special: l,
    invulnerable: i,
  }),
  s = [
    {
      id: 1,
      name: "Le Premier Ordre",
      region: "Marches de l’Ouest",
      briefing: "Apprends à déplacer tes troupes et à capturer une position.",
      objective: "Capture la forteresse orque",
      lesson: "Assauts et routes",
      par: 45,
      terrain: "plain",
      mode: "conquest",
      bases: [
        n(0, 0.1, 0.5, "humans", 34, "fortress"),
        n(1, 0.9, 0.5, "orcs", 22, "fortress"),
        n(2, 0.36, 0.5, "neutral", 7, "village"),
        n(3, 0.64, 0.5, "neutral", 7, "village"),
      ],
      roads: [
        [0, 2],
        [2, 3],
        [3, 1],
      ],
    },
    {
      id: 2,
      name: "Les Terres Fertiles",
      region: "Fleuve d’Argent",
      briefing:
        "Les villages produisent vite. Possède-en davantage pour submerger l’ennemi.",
      objective: "Domine les deux rives",
      lesson: "Production des villages",
      par: 58,
      terrain: "river",
      mode: "conquest",
      bases: [
        n(0, 0.1, 0.5, "humans", 30, "fortress"),
        n(1, 0.9, 0.5, "orcs", 27, "fortress"),
        n(2, 0.32, 0.25, "neutral", 7, "village"),
        n(3, 0.32, 0.75, "neutral", 7, "village"),
        n(4, 0.62, 0.25, "neutral", 9, "village"),
        n(5, 0.62, 0.75, "neutral", 9, "village"),
      ],
      roads: [
        [0, 2],
        [0, 3],
        [2, 4],
        [3, 5],
        [4, 1],
        [5, 1],
        [2, 3],
        [4, 5],
      ],
    },
    {
      id: 3,
      name: "Le Verrou de Pierre",
      region: "Plaines Royales",
      briefing:
        "La citadelle centrale résiste mieux. Accumule tes forces avant de l’attaquer.",
      objective: "Brise la citadelle centrale",
      lesson: "Défense des forteresses",
      par: 70,
      terrain: "plain",
      mode: "conquest",
      bases: [
        n(0, 0.08, 0.5, "humans", 34, "fortress"),
        n(1, 0.92, 0.5, "orcs", 34, "fortress"),
        n(2, 0.26, 0.22, "neutral", 7, "village"),
        n(3, 0.26, 0.78, "neutral", 7, "village"),
        n(4, 0.5, 0.5, "neutral", 24, "fortress"),
        n(5, 0.74, 0.22, "neutral", 8, "village"),
        n(6, 0.74, 0.78, "neutral", 8, "village"),
      ],
      roads: [
        [0, 2],
        [0, 3],
        [2, 4],
        [3, 4],
        [4, 5],
        [4, 6],
        [5, 1],
        [6, 1],
      ],
    },
    {
      id: 4,
      name: "Les Tours du Nord",
      region: "Monts Brisés",
      briefing:
        "Les tours accélèrent les armées. Utilise-les pour créer une ligne de ravitaillement.",
      objective: "Maîtrise les tours puis la Horde",
      lesson: "Tours et ravitaillement",
      par: 78,
      terrain: "mountains",
      mode: "conquest",
      bases: [
        n(0, 0.07, 0.68, "humans", 36, "fortress"),
        n(1, 0.93, 0.3, "orcs", 36, "fortress"),
        n(2, 0.24, 0.7, "neutral", 7, "village"),
        n(3, 0.4, 0.58, "neutral", 11, "tower"),
        n(4, 0.55, 0.42, "neutral", 15, "tower"),
        n(5, 0.72, 0.28, "neutral", 8, "village"),
      ],
      roads: [
        [0, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 1],
      ],
    },
    {
      id: 5,
      name: "La Vallée Fendue",
      region: "Terres Vertes",
      briefing:
        "Plus aucune aide. Deux axes, deux guerres : prouve que tu maîtrises tout.",
      objective: "Écrase la Horde sans assistance",
      par: 78,
      terrain: "valley",
      mode: "conquest",
      bases: [
        n(0, 0.08, 0.5, "humans", 38, "fortress"),
        n(1, 0.92, 0.5, "orcs", 38, "fortress"),
        n(2, 0.25, 0.18, "neutral", 9, "village"),
        n(3, 0.25, 0.82, "neutral", 9, "village"),
        n(4, 0.48, 0.18, "neutral", 15, "tower"),
        n(5, 0.48, 0.82, "neutral", 15, "tower"),
        n(6, 0.72, 0.18, "neutral", 12, "village"),
        n(7, 0.72, 0.82, "neutral", 12, "village"),
      ],
      roads: [
        [0, 2],
        [0, 3],
        [2, 4],
        [3, 5],
        [4, 6],
        [5, 7],
        [6, 1],
        [7, 1],
        [4, 5],
      ],
    },
    {
      id: 6,
      name: "La Dernière Porte",
      region: "Remparts d’Ambre",
      briefing:
        "Les fosses vomissent des vagues orques. La porte doit tenir jusqu’à l’aube.",
      objective: "Tiens la forteresse pendant 75 secondes",
      par: 75,
      terrain: "mountains",
      mode: "defense",
      duration: 75,
      target: 0,
      bases: [
        n(0, 0.5, 0.52, "humans", 45, "fortress"),
        n(1, 0.3, 0.32, "humans", 15, "village"),
        n(2, 0.3, 0.72, "humans", 15, "village"),
        n(3, 0.07, 0.18, "orcs", 35, "fortress", "source", !0),
        n(4, 0.07, 0.82, "orcs", 35, "fortress", "source", !0),
        n(5, 0.9, 0.5, "orcs", 45, "fortress", "source", !0),
      ],
      roads: [
        [3, 1],
        [4, 2],
        [1, 0],
        [2, 0],
        [5, 0],
        [1, 2],
      ],
    },
    {
      id: 7,
      name: "Le Convoi du Roi",
      region: "Route des Cendres",
      briefing:
        "Ouvre chaque relais avant l’arrivée du convoi royal et garde la route derrière lui.",
      objective: "Escorte la caravane jusqu’à la sortie",
      par: 95,
      terrain: "plain",
      mode: "escort",
      path: [0, 2, 3, 4, 5],
      bases: [
        n(0, 0.07, 0.5, "humans", 38, "fortress"),
        n(1, 0.92, 0.2, "orcs", 34, "fortress"),
        n(2, 0.26, 0.5, "neutral", 8, "village"),
        n(3, 0.46, 0.5, "neutral", 14, "tower"),
        n(4, 0.67, 0.5, "neutral", 10, "village"),
        n(5, 0.91, 0.72, "neutral", 4, "fortress", "exit"),
        n(6, 0.67, 0.18, "orcs", 20, "village"),
      ],
      roads: [
        [0, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [1, 6],
        [6, 4],
        [1, 4],
        [3, 6],
      ],
    },
    {
      id: 8,
      name: "Les Trois Sceaux",
      region: "Sanctuaire Brisé",
      briefing:
        "La citadelle est intouchable tant que les trois tours runiques ne sont pas jaunes.",
      objective: "Contrôle les trois sceaux simultanément",
      par: 105,
      terrain: "marsh",
      mode: "seals",
      target: 1,
      specialIds: [2, 3, 4],
      bases: [
        n(0, 0.08, 0.5, "humans", 42, "fortress"),
        n(1, 0.9, 0.5, "orcs", 55, "fortress", "boss", !0),
        n(2, 0.36, 0.18, "neutral", 14, "tower", "seal"),
        n(3, 0.5, 0.5, "neutral", 18, "tower", "seal"),
        n(4, 0.36, 0.82, "neutral", 14, "tower", "seal"),
        n(5, 0.7, 0.2, "orcs", 15, "village"),
        n(6, 0.7, 0.8, "orcs", 15, "village"),
      ],
      roads: [
        [0, 2],
        [0, 4],
        [2, 3],
        [4, 3],
        [2, 5],
        [4, 6],
        [3, 1],
        [5, 1],
        [6, 1],
      ],
    },
    {
      id: 9,
      name: "L’Évacuation",
      region: "Marches en Flammes",
      briefing:
        "Le front est perdu. Sauve les survivants au lieu de gaspiller des vies dans une victoire impossible.",
      objective: "Évacue 70 soldats par la forteresse de l’Est",
      par: 100,
      terrain: "valley",
      mode: "evacuation",
      target: 70,
      specialIds: [6],
      bases: [
        n(0, 0.08, 0.22, "humans", 28, "village"),
        n(1, 0.08, 0.78, "humans", 28, "village"),
        n(2, 0.28, 0.5, "humans", 20, "fortress"),
        n(3, 0.5, 0.25, "neutral", 8, "tower"),
        n(4, 0.5, 0.75, "neutral", 8, "tower"),
        n(5, 0.72, 0.5, "neutral", 10, "village"),
        n(6, 0.92, 0.5, "humans", 5, "fortress", "exit"),
        n(7, 0.3, 0.08, "orcs", 35, "fortress"),
        n(8, 0.3, 0.92, "orcs", 35, "fortress"),
      ],
      roads: [
        [0, 2],
        [1, 2],
        [2, 3],
        [2, 4],
        [3, 5],
        [4, 5],
        [5, 6],
        [7, 0],
        [7, 3],
        [8, 1],
        [8, 4],
      ],
    },
    {
      id: 10,
      name: "Le Géant de Pierre",
      region: "Cœur de Basalte",
      briefing:
        "Trois tours nourrissent le bastion : vitesse, défense et production. Coupe-les avant le coup final.",
      objective: "Détruis les trois runes puis le bastion",
      par: 125,
      terrain: "mountains",
      mode: "boss",
      target: 1,
      specialIds: [3, 4, 5],
      bases: [
        n(0, 0.06, 0.5, "humans", 48, "fortress"),
        n(1, 0.92, 0.5, "orcs", 150, "fortress", "boss"),
        n(2, 0.24, 0.5, "neutral", 10, "village"),
        n(3, 0.48, 0.18, "orcs", 18, "tower", "seal"),
        n(4, 0.54, 0.5, "orcs", 24, "tower", "seal"),
        n(5, 0.48, 0.82, "orcs", 18, "tower", "seal"),
        n(6, 0.72, 0.2, "orcs", 12, "village"),
        n(7, 0.72, 0.8, "orcs", 12, "village"),
      ],
      roads: [
        [0, 2],
        [2, 3],
        [2, 4],
        [2, 5],
        [3, 6],
        [5, 7],
        [4, 1],
        [6, 1],
        [7, 1],
        [3, 4],
        [4, 5],
      ],
    },
    {
      id: 11,
      name: "Le Pont Brisé",
      region: "Fleuve Noir",
      briefing:
        "Sacrifie quarante soldats au chantier pour rétablir le passage avant que la rive ne tombe.",
      objective: "Livre 40 soldats au chantier du pont",
      par: 115,
      terrain: "river",
      mode: "bridge",
      target: 40,
      specialIds: [3],
      lockedRoad: [3, 4],
      bases: [
        n(0, 0.06, 0.5, "humans", 45, "fortress"),
        n(1, 0.93, 0.5, "orcs", 48, "fortress"),
        n(2, 0.26, 0.5, "neutral", 9, "village"),
        n(3, 0.46, 0.5, "neutral", 0, "tower", "worksite"),
        n(4, 0.58, 0.5, "neutral", 12, "tower"),
        n(5, 0.76, 0.25, "orcs", 14, "village"),
        n(6, 0.76, 0.75, "orcs", 14, "village"),
      ],
      roads: [
        [0, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [4, 6],
        [5, 1],
        [6, 1],
      ],
    },
    {
      id: 12,
      name: "Le Traître",
      region: "Duché de Vermeil",
      briefing:
        "Une de tes garnisons vendra le royaume après trente secondes. Prépare-toi à combattre dans ton dos.",
      objective: "Survis à la trahison et élimine la Horde",
      par: 125,
      terrain: "plain",
      mode: "betrayal",
      eventTime: 30,
      bases: [
        n(0, 0.08, 0.5, "humans", 42, "fortress"),
        n(1, 0.92, 0.5, "orcs", 40, "fortress"),
        n(2, 0.28, 0.2, "humans", 15, "village"),
        n(3, 0.28, 0.8, "humans", 15, "village"),
        n(4, 0.5, 0.25, "neutral", 12, "tower"),
        n(5, 0.5, 0.75, "neutral", 12, "tower"),
        n(6, 0.72, 0.2, "neutral", 10, "village"),
        n(7, 0.72, 0.8, "neutral", 10, "village"),
      ],
      roads: [
        [0, 2],
        [0, 3],
        [2, 4],
        [3, 5],
        [4, 6],
        [5, 7],
        [6, 1],
        [7, 1],
        [4, 5],
        [2, 3],
      ],
    },
    {
      id: 13,
      name: "La Nuit des Loups",
      region: "Forêt Sans Lune",
      briefing:
        "L’ennemi et ses garnisons disparaissent au-delà de tes positions. Avance pour révéler la carte.",
      objective: "Conquiers dans le brouillard de guerre",
      par: 130,
      terrain: "marsh",
      mode: "fog",
      bases: [
        n(0, 0.07, 0.5, "humans", 45, "fortress"),
        n(1, 0.93, 0.5, "orcs", 48, "fortress"),
        n(2, 0.24, 0.2, "neutral", 9, "village"),
        n(3, 0.24, 0.8, "neutral", 9, "village"),
        n(4, 0.45, 0.3, "neutral", 15, "tower"),
        n(5, 0.45, 0.7, "neutral", 15, "tower"),
        n(6, 0.65, 0.2, "orcs", 13, "village"),
        n(7, 0.65, 0.8, "orcs", 13, "village"),
        n(8, 0.78, 0.5, "orcs", 22, "fortress"),
      ],
      roads: [
        [0, 2],
        [0, 3],
        [2, 4],
        [3, 5],
        [4, 6],
        [5, 7],
        [4, 5],
        [6, 8],
        [7, 8],
        [8, 1],
      ],
    },
    {
      id: 14,
      name: "La Course à la Couronne",
      region: "Plaine des Rois",
      briefing:
        "La relique centrale donne un point par seconde. Le premier camp à cent remporte la bataille.",
      objective: "Contrôle la relique jusqu’à 100 points",
      par: 140,
      terrain: "plain",
      mode: "relic",
      target: 100,
      specialIds: [4],
      bases: [
        n(0, 0.07, 0.5, "humans", 42, "fortress"),
        n(1, 0.93, 0.5, "orcs", 42, "fortress"),
        n(2, 0.25, 0.22, "neutral", 8, "village"),
        n(3, 0.25, 0.78, "neutral", 8, "village"),
        n(4, 0.5, 0.5, "neutral", 20, "fortress", "relic"),
        n(5, 0.75, 0.22, "neutral", 8, "village"),
        n(6, 0.75, 0.78, "neutral", 8, "village"),
      ],
      roads: [
        [0, 2],
        [0, 3],
        [2, 4],
        [3, 4],
        [4, 5],
        [4, 6],
        [5, 1],
        [6, 1],
      ],
    },
    {
      id: 15,
      name: "L’Armée de l’Aube",
      region: "Portes de la Horde",
      briefing:
        "À l’aube, chaque camp recevra son armée finale. Possède les deux tours et rassemble 120 soldats avant le signal.",
      objective: "Prépare le royaume avant l’arrivée de l’aube",
      par: 160,
      terrain: "valley",
      mode: "dawn",
      eventTime: 90,
      target: 120,
      specialIds: [4, 5],
      bases: [
        n(0, 0.06, 0.5, "humans", 48, "fortress"),
        n(1, 0.94, 0.5, "orcs", 55, "fortress"),
        n(2, 0.22, 0.22, "neutral", 9, "village"),
        n(3, 0.22, 0.78, "neutral", 9, "village"),
        n(4, 0.48, 0.22, "neutral", 16, "tower", "seal"),
        n(5, 0.48, 0.78, "neutral", 16, "tower", "seal"),
        n(6, 0.7, 0.22, "orcs", 18, "village"),
        n(7, 0.7, 0.78, "orcs", 18, "village"),
        n(8, 0.58, 0.5, "neutral", 28, "fortress"),
      ],
      roads: [
        [0, 2],
        [0, 3],
        [2, 4],
        [3, 5],
        [4, 8],
        [5, 8],
        [8, 6],
        [8, 7],
        [6, 1],
        [7, 1],
        [4, 5],
      ],
    },
  ],
  a = {
    village: { production: 1.65, defense: 1, speed: 1 },
    fortress: { production: 0.9, defense: 1.35, speed: 1 },
    tower: { production: 1.1, defense: 1, speed: 1.5 },
  },
  l = {
    humans: {
      main: "#f2c45d",
      dark: "#65401d",
      glow: "rgba(242,196,93,.5)",
    },
    orcs: { main: "#e85d48", dark: "#531c17", glow: "rgba(232,93,72,.48)" },
    neutral: {
      main: "#aeb6aa",
      dark: "#40483f",
      glow: "rgba(174,182,170,.22)",
    },
  },
  i = "royaumes-campaign-v1",
  o = () => ({
    evacuated: 0,
    bridge: 0,
    humanScore: 0,
    orcScore: 0,
    caravanIndex: 0,
    caravanProgress: 0,
    betrayalDone: !1,
    dawnDone: !1,
    nextWave: 7,
    lostHumanBase: !1,
    sealsOpened: !1,
  }),
  u = (e) => e.bases.map((e) => ({ ...e })),
  c = {
    1: [
      {
        title: "Ton premier ordre",
        text: "Glisse depuis ta forteresse jaune vers le village voisin.",
      },
      {
        title: "Choisis la taille de l’ordre",
        text: "Utilise ¼, ½ ou TOUT puis capture le second village.",
      },
      {
        title: "Le cœur ennemi",
        text: "Regroupe tes troupes et prends la forteresse rouge.",
      },
    ],
    2: [
      {
        title: "Les villages produisent vite",
        text: "Capture les villages pour accélérer ton économie.",
      },
    ],
    3: [
      {
        title: "Une forteresse résiste",
        text: "Sa défense réduit les assauts. Accumule une force supérieure.",
      },
    ],
    4: [
      {
        title: "Les tours accélèrent",
        text: "Capture une tour, puis active RAVITAILLEMENT pour renforcer le front.",
      },
    ],
  },
  missionScenes = {
    6: {
      chapter: "ACTE II · LA HORDE DÉFERLE",
      scene:
        "Les cors résonnent sous les remparts. Dans la brume, trois colonnes orques convergent déjà vers la dernière porte encore debout.",
      rule: "Défense totale · La forteresse centrale ne doit jamais tomber",
    },
    7: {
      chapter: "ACTE II · LA ROUTE DU ROI",
      scene:
        "Les étendards royaux avancent dans un nuage de cendre. Chaque relais conquis ouvre quelques mètres de route au convoi.",
      rule: "Escorte · Sécurise le prochain relais avant l’arrivée du convoi",
    },
    8: {
      chapter: "ACTE II · LE SANCTUAIRE",
      scene:
        "Trois runes battent comme des cœurs autour d’une citadelle inviolable. Elles doivent toutes porter tes couleurs au même instant.",
      rule: "Sceaux · Contrôle les trois tours pour briser la protection",
    },
    9: {
      chapter: "ACTE III · TERRE BRÛLÉE",
      scene:
        "Les villages brûlent derrière toi. Cette fois, gagner ne signifie pas conquérir : il faut arracher le plus de soldats possible au massacre.",
      rule: "Évacuation · Fais parvenir 70 soldats jusqu’à la sortie",
    },
    10: {
      chapter: "ACTE III · LE CŒUR DE PIERRE",
      scene:
        "Le bastion de basalte domine la vallée. Trois runes alimentent ses murailles et rendent tout assaut frontal suicidaire.",
      rule: "Boss · Coupe ses trois runes avant de frapper le bastion",
    },
    11: {
      chapter: "ACTE III · LE FLEUVE NOIR",
      scene:
        "Le pont s’est effondré dans le courant. Sur l’autre rive, la Horde se rassemble pendant que tes bâtisseurs attendent des renforts.",
      rule: "Chantier · Sacrifie 40 soldats pour rouvrir la route",
    },
    12: {
      chapter: "ACTE IV · LE SERMENT BRISÉ",
      scene:
        "Un messager agonisant n’a livré que quelques mots : l’un de tes capitaines a vendu sa garnison. Tu ignores encore lequel.",
      rule: "Trahison · Une de tes positions changera de camp après 30 secondes",
    },
    13: {
      chapter: "ACTE IV · SANS LUNE",
      scene:
        "Sous les arbres noirs, les routes disparaissent et les tambours semblent venir de partout. Chaque position prise repousse un peu la nuit.",
      rule: "Brouillard · Avance pour révéler les positions ennemies",
    },
    14: {
      chapter: "ACTE IV · LE TRÔNE VIDE",
      scene:
        "La couronne des anciens rois repose au centre de la plaine. Deux armées la voient. Une seule pourra la garder assez longtemps.",
      rule: "Domination · La relique rapporte un point par seconde",
    },
    15: {
      chapter: "ACTE V · L’AUBE ROUGE",
      scene:
        "La nuit touche à sa fin. Quand le soleil franchira les montagnes, l’armée qui aura préparé le terrain recevra le dernier renfort du royaume.",
      rule: "Finale · Tiens les deux tours et rassemble 120 soldats avant l’aube",
    },
  };

const mission2AssetSources = {
  map: "/assets/mission-2/river-diorama.webp",
  village: "/assets/mission-2/village.png",
  fortress: "/assets/mission-2/fortress.png",
};

export default function Game() {
  let e = (0, t.useRef)(null),
    n = (0, t.useRef)(u(s[0])),
    d = (0, t.useRef)([]),
    m = (0, t.useRef)([]),
    f = (0, t.useRef)([]),
    h = (0, t.useRef)(s[0]),
    g = (0, t.useRef)("playing"),
    p = (0, t.useRef)("campaign"),
    v = (0, t.useRef)(0.5),
    b = (0, t.useRef)(!1),
    x = (0, t.useRef)(null),
    w = (0, t.useRef)(null),
    j = (0, t.useRef)(null),
    y = (0, t.useRef)(0),
    S = (0, t.useRef)(0),
    R = (0, t.useRef)(0),
    T = (0, t.useRef)(0),
    k = (0, t.useRef)(o()),
    C = (0, t.useRef)(1),
    M = (0, t.useRef)(null),
    N = (0, t.useRef)(!1),
    L = (0, t.useRef)(0),
    commandPower = (0, t.useRef)({
      charge: 0,
      targeting: !1,
      buffBaseId: null,
      buffUntil: 0,
      readyAnnounced: !1,
    }),
    audioEngine = (0, t.useRef)(null),
    battleFx = (0, t.useRef)({ shake: 0, flash: 0, color: "242,196,93" }),
    mission2Art = (0, t.useRef)({
      map: null,
      village: null,
      fortress: null,
    }),
    [P, A] = (0, t.useState)("campaign"),
    [E, I] = (0, t.useState)("playing"),
    [O, q] = (0, t.useState)(1),
    [D, U] = (0, t.useState)(0.5),
    [$, B] = (0, t.useState)(!1),
    [H, F] = (0, t.useState)(!1),
    [V, W] = (0, t.useState)(!1),
    [G, J] = (0, t.useState)(null),
    [Q, X] = (0, t.useState)(0),
    [z, K] = (0, t.useState)(""),
    [Y, Z] = (0, t.useState)({ humans: 0, orcs: 0, time: 0 }),
    [_, ee] = (0, t.useState)({ unlocked: 1, crowns: {} }),
    [missionIntro, setMissionIntro] = (0, t.useState)(null),
    [commandUi, setCommandUi] = (0, t.useState)({
      charge: 0,
      targeting: !1,
      active: 0,
    });
  ((0, t.useEffect)(() => {
    let e = window.setTimeout(() => {
      try {
        let e = localStorage.getItem(i);
        if (e) {
          let r = JSON.parse(e);
          ee({
            unlocked: Math.max(1, Math.min(15, r.unlocked || 1)),
            crowns: r.crowns || {},
          });
        }
      } catch {}
    }, 0);
    return (
      "serviceWorker" in navigator &&
        navigator.serviceWorker.register("/sw.js").catch(() => void 0),
      () => window.clearTimeout(e)
    );
  }, []),
    (0, t.useEffect)(() => {
      p.current = P;
    }, [P]),
    (0, t.useEffect)(() => {
      g.current = E;
    }, [E]),
    (0, t.useEffect)(() => {
      v.current = D;
    }, [D]),
    (0, t.useEffect)(() => {
      b.current = $;
    }, [$]),
    (0, t.useEffect)(() => {
      N.current = H;
      audioEngine.current?.setMuted(H);
    }, [H]),
    (0, t.useEffect)(() => {
      L.current = Q;
    }, [Q]),
    (0, t.useEffect)(
      () => () => {
        audioEngine.current?.stop();
      },
      [],
    ));
  (0, t.useEffect)(() => {
    let cancelled = !1;
    for (let [key, source] of Object.entries(mission2AssetSources)) {
      let image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (!cancelled) mission2Art.current[key] = image;
      };
      image.src = source;
    }
    return () => {
      cancelled = !0;
    };
  }, []);
  let er = (0, t.useCallback)((e, r = 0.07, t = 0.035) => {
      if (!N.current)
        try {
          let n = window.AudioContext || window.webkitAudioContext;
          M.current ??= new n();
          let s = M.current,
            a = s.createOscillator(),
            l = s.createGain();
          ((a.type = "triangle"),
            (a.frequency.value = e),
            l.gain.setValueAtTime(t, s.currentTime),
            l.gain.exponentialRampToValueAtTime(0.001, s.currentTime + r),
            a.connect(l),
            l.connect(s.destination),
            a.start(),
            a.stop(s.currentTime + r));
        } catch {}
    }, []),
    et = (0, t.useCallback)((e) => {
      (J(e), window.setTimeout(() => J((r) => (r === e ? null : r)), 1500));
    }, []),
    immersiveSound = (0, t.useCallback)((e) => {
      if (N.current) return;
      audioEngine.current ??= createImmersionAudio();
      audioEngine.current.play(e);
    }, []),
    impactFeedback = (0, t.useCallback)((e, r, t, n = 1) => {
      battleFx.current.shake = Math.max(battleFx.current.shake, 7 * n);
      battleFx.current.flash = Math.max(battleFx.current.flash, 0.16 * n);
      battleFx.current.color = t === l.orcs.main ? "232,93,72" : "242,196,93";
      for (let s = 0; s < 9 + 5 * n; s++) {
        let a = (Math.PI * 2 * s) / (9 + 5 * n) + Math.random() * 0.35;
        f.current.push({
          id: C.current++,
          x: e,
          y: r,
          color: t,
          kind: "spark",
          vx: Math.cos(a) * (0.055 + Math.random() * 0.055) * n,
          vy: Math.sin(a) * (0.08 + Math.random() * 0.05) * n,
          age: 0,
        });
      }
    }, []),
    en = (e, r) => {
      let t = h.current;
      if (
        !t.roads.some(([t, n]) => (t === e && n === r) || (t === r && n === e))
      )
        return !1;
      let n = t.lockedRoad;
      return (
        !n ||
        !(k.current.bridge < (t.target || 40)) ||
        ((n[0] !== e || n[1] !== r) && (n[1] !== e || n[0] !== r))
      );
    },
    es = (0, t.useCallback)(() => {
      let e = h.current,
        r = k.current,
        t = Math.floor(T.current);
      switch (e.mode) {
        case "defense":
          return `Porte : ${Math.max(0, (e.duration || 75) - t)} s`;
        case "escort":
          return `Convoi : ${Math.min(e.path?.length || 1, r.caravanIndex + 1)}/${e.path?.length || 1}`;
        case "seals":
          return `Sceaux : ${e.specialIds?.filter((e) => n.current[e]?.owner === "humans").length || 0}/3`;
        case "evacuation":
          return `\xc9vacu\xe9s : ${Math.floor(r.evacuated)}/${e.target}`;
        case "boss":
          return `Runes ennemies : ${e.specialIds?.filter((e) => n.current[e]?.owner === "orcs").length || 0} \xb7 Bastion ${Math.floor(n.current[e.target || 1]?.units || 0)}`;
        case "bridge":
          return r.bridge < (e.target || 40)
            ? `Pont : ${Math.floor(r.bridge)}/${e.target}`
            : "Passage ouvert · Élimine la Horde";
        case "betrayal":
          return r.betrayalDone
            ? "Le traître s’est révélé"
            : "Trahison dans " + Math.max(0, (e.eventTime || 30) - t) + " s";
        case "fog":
          return "Explore et élimine la Horde";
        case "relic":
          return `Couronne ${Math.floor(r.humanScore)}/100 \xb7 Horde ${Math.floor(r.orcScore)}/100`;
        case "dawn": {
          if (r.dawnDone) return "Bataille finale";
          let s =
              e.specialIds?.filter((e) => n.current[e]?.owner === "humans")
                .length || 0,
            a = n.current
              .filter((e) => "humans" === e.owner)
              .reduce((e, r) => e + r.units, 0);
          return `Aube ${Math.max(0, (e.eventTime || 90) - t)} s \xb7 Tours ${s}/2 \xb7 ${Math.floor(a)}/${e.target}`;
        }
        default:
          return e.objective;
      }
    }, []),
    ea = (0, t.useCallback)(
      (e) => {
        if (
          "playing" === g.current &&
          ((g.current = e),
          I(e),
          er("won" === e ? 880 : 130, 0.35, 0.06),
          immersiveSound("won" === e ? "victory" : "defeat"),
          (battleFx.current.shake = "won" === e ? 5 : 12),
          (battleFx.current.flash = 0.65),
          (battleFx.current.color = "won" === e ? "242,196,93" : "232,93,72"),
          navigator.vibrate?.("won" === e ? [35, 45, 70] : [90, 40, 120]),
          "won" === e)
        ) {
          let e = h.current,
            r = k.current,
            t = 1 + +(T.current <= e.par) + +!r.lostHumanBase;
          ee((r) => {
            let n = {
              unlocked: Math.max(r.unlocked, Math.min(15, e.id + 1)),
              crowns: {
                ...r.crowns,
                [e.id]: Math.max(r.crowns[e.id] || 0, t),
              },
            };
            return (localStorage.setItem(i, JSON.stringify(n)), n);
          });
        }
      },
      [er, immersiveSound],
    ),
    el = (0, t.useCallback)(
      (e) => {
        let r = s[e - 1];
        (setMissionIntro(null),
          (h.current = r),
          (n.current = u(r)),
          (d.current = []),
          (m.current = []),
          (f.current = []),
          (k.current = o()),
          (T.current = 0),
          (S.current = 0),
          (R.current = 0),
          (y.current = performance.now()),
          (x.current = null),
          (w.current = null),
          (j.current = null),
          (L.current = 0),
          (commandPower.current = {
            charge: r.id === 6 ? 65 : r.id > 6 ? 25 : 0,
            targeting: !1,
            buffBaseId: null,
            buffUntil: 0,
            readyAnnounced: !1,
          }),
          setCommandUi({
            charge: r.id === 6 ? 65 : r.id > 6 ? 25 : 0,
            targeting: !1,
            active: 0,
          }),
          X(0),
          q(e),
          I("playing"),
          (g.current = "playing"),
          A("battle"),
          (p.current = "battle"),
          B(!1),
          K(r.objective),
          Z({
            humans: r.bases.filter((e) => "humans" === e.owner).length,
            orcs: r.bases.filter((e) => "orcs" === e.owner).length,
            time: 0,
          }),
          screen.orientation?.lock?.("landscape").catch(() => void 0),
          er(440, 0.09, 0.025),
          (audioEngine.current ??= createImmersionAudio()),
          audioEngine.current.startBattle(r.terrain, r.mode));
      },
      [er],
    ),
    openMission = (0, t.useCallback)(
      (e) => {
        let r = s[e - 1];
        r.id >= 6 ? setMissionIntro(r) : el(e);
      },
      [el],
    ),
    gainCommand = (0, t.useCallback)((e) => {
      if (h.current.id < 6 || e <= 0) return;
      let r = commandPower.current,
        n = Math.min(100, r.charge + e);
      ((r.charge = n),
        setCommandUi((e) => ({ ...e, charge: n })));
    }, []),
    beginPowerTargeting = (0, t.useCallback)(() => {
      let e = commandPower.current;
      if (h.current.id < 6 || "playing" !== g.current) return;
      if (e.targeting) {
        ((e.targeting = !1),
          setCommandUi((e) => ({ ...e, targeting: !1 })),
          et("Ordre annulé"));
        return;
      }
      if (e.charge < 100) return void et("Commandement insuffisant");
      ((e.targeting = !0),
        setCommandUi((e) => ({ ...e, targeting: !0 })),
        immersiveSound("magic"),
        navigator.vibrate?.(22),
        et("Choisis une base alliée"));
    }, [et, immersiveSound]),
    ei = (0, t.useCallback)(
      (e, r, t, s) => {
        if ("playing" !== g.current || "battle" !== p.current || !en(e, r))
          return !1;
        let i = n.current[e];
        if (!i || i.owner !== t || i.units < 2) return !1;
        let o = Math.min(
          Math.floor(i.units) - 1,
          Math.max(
            1,
            Math.floor(i.units * (s ?? ("humans" === t ? v.current : 0.5))),
          ),
        );
        return (
          !(o < 1) &&
          ((i.units -= o),
          d.current.push({
            id: C.current++,
            from: e,
            to: r,
            owner: t,
            units: o,
            progress: 0,
            previousProgress: 0,
            speed: a[i.kind].speed,
          }),
          f.current.push({
            id: C.current++,
            x: i.x,
            y: i.y,
            color: l[t].main,
            text: `−${o}`,
            age: 0,
          }),
          "humans" === t &&
            (er(520, 0.055),
            immersiveSound("launch"),
            navigator.vibrate?.(18)),
          !0)
        );
      },
      [er, immersiveSound],
    ),
    activateRoyalBanner = (0, t.useCallback)(
      (e) => {
        let r = commandPower.current,
          t = n.current[e];
        if (!r.targeting || r.charge < 100) return !1;
        if (!t || "humans" !== t.owner)
          return (
            immersiveSound("invalid"),
            navigator.vibrate?.(35),
            et("La bannière exige une base alliée"),
            !1
          );
        let s = h.current.roads
            .filter(([r, t]) => r === e || t === e)
            .map(([r, t]) => (r === e ? t : r)),
          a = 0;
        for (let r of s) {
          let s = n.current[r];
          s?.owner === "humans" && r !== e && ei(r, e, "humans", 0.25) && a++;
        }
        return (
          (r.charge = 0),
          (r.targeting = !1),
          (r.buffBaseId = e),
          (r.buffUntil = T.current + 8),
          (r.readyAnnounced = !1),
          setCommandUi({ charge: 0, targeting: !1, active: 8 }),
          f.current.push({
            id: C.current++,
            x: t.x,
            y: t.y,
            color: l.humans.main,
            text: "BANNIÈRE",
            age: 0,
          }),
          impactFeedback(t.x, t.y, l.humans.main, 1.3),
          immersiveSound("magic"),
          er(920, 0.24, 0.055),
          navigator.vibrate?.([30, 25, 65]),
          et(
            a
              ? `La Bannière rallie ${a} garnison${a > 1 ? "s" : ""} !`
              : "La Bannière renforce la production !",
          ),
          !0
        );
      },
      [ei, er, et, immersiveSound, impactFeedback],
    ),
    eo = (e) => {
      if ("fog" !== h.current.mode) return !0;
      let r = n.current.filter((e) => "humans" === e.owner).map((e) => e.id);
      return (
        r.includes(e) ||
        h.current.roads.some(
          ([t, n]) => (r.includes(t) && n === e) || (r.includes(n) && t === e),
        )
      );
    };
  (0, t.useEffect)(() => {
    let r = e.current;
    if (!r) return;
    let t = r.getContext("2d");
    if (!t) return;
    let s = 0,
      i = () => {
        let e = r.getBoundingClientRect(),
          n = Math.min(devicePixelRatio || 1, 2);
        ((r.width = Math.round(e.width * n)),
          (r.height = Math.round(e.height * n)),
          t.setTransform(n, 0, 0, n, 0, 0));
      };
    i();
    let o = new ResizeObserver(i);
    o.observe(r);
    let u = (e) => {
      let i = r.getBoundingClientRect(),
        o = i.width,
        c = i.height,
        b = o - 48,
        M = c - 68,
        N = Math.min((e - (y.current || e)) / 1e3, 0.05);
      y.current = e;
      let L = h.current,
        P = k.current;
      let activeFx = battleFx.current;
      activeFx.shake = Math.max(0, activeFx.shake - 22 * N);
      activeFx.flash = Math.max(0, activeFx.flash - 1.9 * N);
      r.style.transform = activeFx.shake
        ? `translate3d(${(Math.random() - 0.5) * activeFx.shake}px, ${(Math.random() - 0.5) * activeFx.shake}px, 0)`
        : "translate3d(0,0,0)";
      if ("battle" === p.current && "playing" === g.current) {
        ((T.current += N),
          (S.current += N),
          (R.current += N));
        if (L.id >= 6) {
          let e = commandPower.current;
          ((e.charge = Math.min(100, e.charge + 1.15 * N)),
            e.charge >= 100 &&
              !e.readyAnnounced &&
              ((e.readyAnnounced = !0),
              immersiveSound("magic"),
              navigator.vibrate?.([18, 24, 32]),
              et("La Bannière du Roi est prête")));
        }
        for (let e of n.current)
          "neutral" === e.owner ||
            e.invulnerable ||
            (e.units = Math.min(
              "boss" === e.special ? 199 : 99,
              e.units +
                N *
                  a[e.kind].production *
                  ("orcs" === e.owner &&
                  "boss" === L.mode &&
                  "boss" === e.special
                    ? 1.35
                    : 1) *
                  ("humans" === e.owner &&
                  commandPower.current.buffBaseId === e.id &&
                  T.current < commandPower.current.buffUntil
                    ? 1.65
                    : 1),
            ));
        if ("relic" === L.mode) {
          let e = n.current[L.specialIds?.[0] || 4];
          ("humans" === e.owner && (P.humanScore += N),
            "orcs" === e.owner && (P.orcScore += N),
            P.humanScore >= 100 && ea("won"),
            P.orcScore >= 100 && ea("lost"));
        }
        if ("escort" === L.mode && L.path) {
          let e = L.path[P.caravanIndex + 1];
          (void 0 !== e &&
            "humans" === n.current[e].owner &&
            ((P.caravanProgress += 0.16 * N),
            P.caravanProgress >= 1 &&
              (P.caravanIndex++,
              (P.caravanProgress = 0),
              et("Le convoi atteint un relais"))),
            P.caravanIndex >= L.path.length - 1 && ea("won"));
        }
        if (
          ("seals" === L.mode &&
            (L.specialIds?.every((e) => "humans" === n.current[e].owner) ||
              0) &&
            !P.sealsOpened &&
            ((P.sealsOpened = !0),
            (n.current[L.target || 1].invulnerable = !1),
            immersiveSound("magic"),
            (battleFx.current.flash = 0.45),
            et("Les sceaux sont brisés !")),
          "betrayal" === L.mode &&
            !P.betrayalDone &&
            T.current >= (L.eventTime || 30))
        ) {
          let e = n.current
            .filter((e) => "humans" === e.owner && 0 !== e.id)
            .sort((e, r) => r.units - e.units)[0];
          ((P.betrayalDone = !0),
            e &&
              ((e.owner = "orcs"),
              (e.units = Math.max(16, e.units)),
              (P.lostHumanBase = !0),
              immersiveSound("betrayal"),
              impactFeedback(e.x, e.y, l.orcs.main, 1.5),
              navigator.vibrate?.([70, 35, 100]),
              et("Trahison ! Une garnison se retourne")));
        }
        if (
          ("dawn" === L.mode &&
            !P.dawnDone &&
            T.current >= (L.eventTime || 90) &&
            ((P.dawnDone = !0),
            L.specialIds?.every((e) => "humans" === n.current[e].owner) &&
            n.current
              .filter((e) => "humans" === e.owner)
              .reduce((e, r) => e + r.units, 0) >= (L.target || 120)
              ? ((n.current[0].units += 80),
                immersiveSound("magic"),
                impactFeedback(n.current[0].x, n.current[0].y, l.humans.main, 1.4),
                et("L’Armée de l’Aube est arrivée !"))
              : ((n.current[1].units += 90),
                immersiveSound("wave"),
                impactFeedback(n.current[1].x, n.current[1].y, l.orcs.main, 1.5),
                et("La Horde déferle !"))),
          "defense" === L.mode && T.current >= P.nextWave)
        ) {
          for (let e of ((P.nextWave += 8),
          n.current.filter((e) => "source" === e.special))) {
            e.units += 11;
            let r = L.roads
              .filter(([r, t]) => r === e.id || t === e.id)
              .map(([r, t]) => (r === e.id ? t : r));
            r.length &&
              ei(e.id, r[Math.floor(Math.random() * r.length)], "orcs", 0.45);
          }
          (immersiveSound("wave"), navigator.vibrate?.([45, 25, 45]));
          et("Une nouvelle vague approche");
        }
        if (
          S.current > 1.65 &&
          ((S.current = 0),
          !(L.id <= 4 && d.current.every((e) => "humans" !== e.owner)))
        ) {
          let e = n.current.filter(
            (e) =>
              ("orcs" === e.owner && e.units >= 12 && !e.invulnerable) ||
              ("orcs" === e.owner && "source" === e.special && e.units >= 12),
          );
          if (e.length) {
            let r = e.sort((e, r) => r.units - e.units)[0],
              t = L.roads
                .filter(([e, t]) => e === r.id || t === r.id)
                .map(([e, t]) => (e === r.id ? t : e))
                .filter((e) => en(r.id, e))
                .map((e) => n.current[e])
                .sort(
                  (e, r) =>
                    e.units +
                    18 * ("orcs" === e.owner) -
                    (r.units + 18 * ("orcs" === r.owner)),
                );
            t[0] && ei(r.id, t[0].id, "orcs");
          }
        }
        for (let e of m.current)
          ((e.clock += N),
            e.clock >= 3.2 && ((e.clock = 0), ei(e.from, e.to, e.owner, 0.25)));
        for (let e of d.current) {
          let r = n.current[e.from],
            t = n.current[e.to];
          ((e.previousProgress = e.progress),
            (e.progress +=
              N *
              ((0.18 * e.speed) /
                Math.max(Math.hypot(t.x - r.x, t.y - r.y), 0.16))));
        }
        let e = new Set();
        for (let r = 0; r < d.current.length; r++)
          for (let t = r + 1; t < d.current.length; t++) {
            let s = d.current[r],
              a = d.current[t];
            if (
              s.owner !== a.owner &&
              s.from === a.to &&
              s.to === a.from &&
              !e.has(s.id) &&
              !e.has(a.id)
            ) {
              let r = s.progress,
                t = 1 - a.progress;
              if (s.previousProgress <= t && r >= t - 0.035) {
                let r = Math.min(s.units, a.units),
                  t = n.current[s.from],
                  l = n.current[s.to],
                  i = (s.progress + 1 - a.progress) / 2,
                  o = t.x + (l.x - t.x) * i,
                  u = t.y + (l.y - t.y) * i;
                ((s.units -= r),
                  (a.units -= r),
                  ((s.owner === "humans" && s.units > 0 && a.units <= 0) ||
                    (a.owner === "humans" && a.units > 0 && s.units <= 0)) &&
                    gainCommand(14),
                  s.units <= 0 && e.add(s.id),
                  a.units <= 0 && e.add(a.id),
                  f.current.push({
                    id: C.current++,
                    x: o,
                    y: u,
                    color: "#fff0c3",
                    text: "CHOC",
                    age: 0,
                  }),
                  immersiveSound("clash"),
                  impactFeedback(o, u, "#fff0c3", 1.25),
                  navigator.vibrate?.([30, 18, 45]),
                  et("Les armées s’affrontent sur la route"));
              }
            }
          }
        for (let r of d.current.filter(
          (r) => r.progress >= 1 && !e.has(r.id),
        )) {
          let t = n.current[r.to],
            s = t.owner;
          if (
            "bridge" === L.mode &&
            "worksite" === t.special &&
            "humans" === r.owner &&
            P.bridge < (L.target || 40)
          ) {
            ((P.bridge = Math.min(L.target || 40, P.bridge + r.units)),
              P.bridge >= (L.target || 40) &&
                ((t.owner = "humans"),
                (t.units = 5),
                immersiveSound("repair"),
                impactFeedback(t.x, t.y, l.humans.main, 1.25),
                et("Le pont est réparé !")),
              e.add(r.id));
            continue;
          }
          if (
            "evacuation" === L.mode &&
            "exit" === t.special &&
            "humans" === t.owner &&
            "humans" === r.owner &&
            r.from !== t.id
          ) {
            ((P.evacuated += r.units),
              e.add(r.id),
              f.current.push({
                id: C.current++,
                x: t.x,
                y: t.y,
                color: l.humans.main,
                text: "SAUVÉS",
                age: 0,
              }),
              immersiveSound("saved"),
              impactFeedback(t.x, t.y, l.humans.main, 0.7),
              P.evacuated >= (L.target || 70) && ea("won"));
            continue;
          }
          if (t.invulnerable && t.owner !== r.owner) {
            (e.add(r.id),
              f.current.push({
                id: C.current++,
                x: t.x,
                y: t.y,
                color: l.orcs.main,
                text: "IMMUNE",
                age: 0,
              }),
              immersiveSound("invalid"),
              impactFeedback(t.x, t.y, l.orcs.main, 0.8),
              "humans" === r.owner && et("Cette position est protégée"));
            continue;
          }
          if (t.owner === r.owner)
            t.units = Math.min(
              "boss" === t.special ? 199 : 99,
              t.units + r.units,
            );
          else {
            let e = a[t.kind].defense;
            "boss" === L.mode &&
              "boss" === t.special &&
              (e +=
                0.18 *
                (L.specialIds?.filter((e) => "orcs" === n.current[e].owner)
                  .length || 0));
            let s = r.units / e;
            s > t.units
              ? ((t.owner = r.owner),
                (t.units = Math.max(1, (s - t.units) * e)))
              : (t.units -= s);
          }
          "humans" === s && "humans" !== t.owner && (P.lostHumanBase = !0);
          let i = s !== t.owner;
          (f.current.push({
            id: C.current++,
            x: t.x,
            y: t.y,
            color: l[r.owner].main,
            text: i ? "CAPTURÉE" : `−${r.units}`,
            age: 0,
          }),
            s !== r.owner &&
              (impactFeedback(t.x, t.y, l[r.owner].main, i ? 1.25 : 0.75),
              immersiveSound(i && "humans" === r.owner ? "capture" : i ? "loss" : "impact"),
              navigator.vibrate?.(i ? [25, 30, 55] : 15)),
            "humans" === r.owner &&
              i &&
              (er(780, 0.16, 0.05),
              gainCommand(22),
              et("Position capturée !"),
              1 === L.id && X((e) => Math.min(2, e + 1))),
            e.add(r.id));
        }
        for (let r of ((d.current = d.current.filter((r) => !e.has(r.id))),
        f.current))
          r.age += N;
        if (
          ((f.current = f.current.filter((e) => e.age < 0.9)),
          "defense" === L.mode)
        )
          "humans" !== n.current[L.target || 0].owner
            ? ea("lost")
            : T.current >= (L.duration || 75) && ea("won");
        else if ("boss" === L.mode && "orcs" !== n.current[L.target || 1].owner)
          ea("won");
        else if (!["escort", "evacuation", "relic"].includes(L.mode)) {
          let e =
              n.current.some((e) => "humans" === e.owner) ||
              d.current.some((e) => "humans" === e.owner),
            r =
              n.current.some((e) => "orcs" === e.owner && !e.invulnerable) ||
              d.current.some((e) => "orcs" === e.owner);
          e
            ? r || "seals" === L.mode
              ? "seals" === L.mode &&
                P.sealsOpened &&
                "orcs" !== n.current[L.target || 1].owner &&
                ea("won")
              : ea("won")
            : ea("lost");
        }
        R.current > 0.25 &&
          ((R.current = 0),
          audioEngine.current?.setIntensity(
            Math.min(1, 0.18 + 0.08 * d.current.length + (T.current > 45 ? 0.12 : 0)),
          ),
          setCommandUi({
            charge: commandPower.current.charge,
            targeting: commandPower.current.targeting,
            active: Math.max(
              0,
              Math.ceil(commandPower.current.buffUntil - T.current),
            ),
          }),
          Z({
            humans: n.current.filter((e) => "humans" === e.owner).length,
            orcs: n.current.filter((e) => "orcs" === e.owner).length,
            time: Math.floor(T.current),
          }),
          K(es()));
      }
      let mission2Map = 2 === L.id ? mission2Art.current.map : null;
      if (mission2Map?.complete && mission2Map.naturalWidth) {
        let scale = Math.max(
            o / mission2Map.naturalWidth,
            c / mission2Map.naturalHeight,
          ),
          sourceWidth = o / scale,
          sourceHeight = c / scale,
          sourceX = (mission2Map.naturalWidth - sourceWidth) / 2,
          sourceY = (mission2Map.naturalHeight - sourceHeight) / 2;
        (t.drawImage(
          mission2Map,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          0,
          0,
          o,
          c,
        ),
          (t.fillStyle = "rgba(4,9,6,.12)"),
          t.fillRect(0, 0, o, c));
      } else {
        let terrainColors = {
          plain: ["#294c31", "#193523", "#34291b"],
          valley: ["#315039", "#183326", "#3d2d1f"],
          mountains: ["#303b32", "#1d2d27", "#46352d"],
          marsh: ["#183b35", "#122c28", "#2d3022"],
          river: ["#24463d", "#15342f", "#3a3024"],
        }[L.terrain] || ["#294c31", "#193523", "#34291b"],
        A = t.createLinearGradient(0, 0, o, c);
      (A.addColorStop(0, terrainColors[0]),
        A.addColorStop(0.55, terrainColors[1]),
        A.addColorStop(1, terrainColors[2]),
        (t.fillStyle = A),
        t.fillRect(0, 0, o, c));
      t.save();
      for (let e = 0; e < 95; e++) {
        let r = (37 * e + 19 * Math.sin(1.7 * e)) % o,
          n = (61 * e + 23 * Math.cos(2.1 * e)) % c,
          s = 0.8 + (e % 4) * 0.45;
        ((t.globalAlpha = 0.055 + (e % 3) * 0.018),
          (t.fillStyle = 0 === e % 2 ? "#f4ddb0" : "#07100c"),
          t.beginPath(),
          t.arc(r, n, s, 0, 7),
          t.fill());
      }
      if ("river" === L.terrain) {
        let e = t.createLinearGradient(0.4 * o, 0, 0.68 * o, 0);
        (e.addColorStop(0, "rgba(25,77,78,0)"),
          e.addColorStop(0.28, "rgba(38,105,105,.48)"),
          e.addColorStop(0.5, "rgba(62,132,128,.68)"),
          e.addColorStop(0.72, "rgba(38,105,105,.48)"),
          e.addColorStop(1, "rgba(25,77,78,0)"),
          (t.fillStyle = e),
          t.beginPath(),
          t.moveTo(0.42 * o, 0),
          t.bezierCurveTo(0.6 * o, 0.26 * c, 0.38 * o, 0.72 * c, 0.55 * o, c),
          t.lineTo(0.68 * o, c),
          t.bezierCurveTo(0.5 * o, 0.7 * c, 0.72 * o, 0.25 * c, 0.55 * o, 0),
          t.closePath(),
          t.fill());
        for (let e = 0; e < 7; e++)
          ((t.strokeStyle = "rgba(181,224,211,.16)"),
            (t.lineWidth = 1),
            t.beginPath(),
            t.moveTo(0.45 * o + 7 * e, 12 + 49 * e),
            t.quadraticCurveTo(0.53 * o, 25 + 48 * e, 0.59 * o, 12 + 49 * e),
            t.stroke());
      } else if ("mountains" === L.terrain) {
        for (let e = 0; e < 9; e++) {
          let r = (e / 8) * o,
            n = 18 + 16 * (e % 3);
          ((t.fillStyle = "rgba(8,13,11,.24)"),
            t.beginPath(),
            t.moveTo(r - 58, n + 52),
            t.lineTo(r, n - 22),
            t.lineTo(r + 66, n + 52),
            t.fill(),
            (t.strokeStyle = "rgba(239,220,178,.08)"),
            t.beginPath(),
            t.moveTo(r - 15, n - 3),
            t.lineTo(r, n - 22),
            t.lineTo(r + 17, n - 2),
            t.stroke());
        }
      } else if ("marsh" === L.terrain) {
        for (let e = 0; e < 12; e++) {
          let r = (83 * e + 40) % o,
            n = (47 * e + 35) % c;
          ((t.fillStyle = "rgba(41,103,92,.18)"),
            t.beginPath(),
            t.ellipse(r, n, 28 + (e % 3) * 9, 9 + (e % 2) * 4, 0.2, 0, 7),
            t.fill());
        }
      } else {
        for (let e = 0; e < 34; e++) {
          let r = (71 * e + 29) % o,
            n = (43 * e + 17) % c;
          ((t.strokeStyle = "rgba(198,213,161,.08)"),
            t.beginPath(),
            t.moveTo(r, n + 5),
            t.lineTo(r - 2, n - 2 - (e % 4)),
            t.moveTo(r, n + 5),
            t.lineTo(r + 3, n),
            t.stroke());
        }
      }
      let vignette = t.createRadialGradient(
        o / 2,
        c / 2,
        0,
        o / 2,
        c / 2,
        Math.max(o, c) * 0.72,
      );
      (vignette.addColorStop(0.55, "rgba(0,0,0,0)"),
        vignette.addColorStop(1, "rgba(0,0,0,.48)"),
        (t.globalAlpha = 1),
        (t.fillStyle = vignette),
        t.fillRect(0, 0, o, c),
        t.restore());
      }
      let E = (e) => 24 + e.x * b,
        I = (e) => 44 + e.y * M;
      for (let [e, r] of L.roads) {
        let s = n.current[e],
          a = n.current[r],
          l =
            L.lockedRoad &&
            P.bridge < (L.target || 40) &&
            ((e === L.lockedRoad[0] && r === L.lockedRoad[1]) ||
              (r === L.lockedRoad[0] && e === L.lockedRoad[1]));
        if (2 === L.id && !l) {
          (t.beginPath(),
            t.moveTo(E(s), I(s)),
            t.lineTo(E(a), I(a)),
            (t.strokeStyle = "rgba(42,30,16,.62)"),
            (t.lineWidth = 8),
            t.stroke(),
            t.beginPath(),
            t.moveTo(E(s), I(s)),
            t.lineTo(E(a), I(a)),
            (t.strokeStyle = "rgba(222,195,132,.68)"),
            (t.lineWidth = 3),
            t.stroke());
        } else
          (t.beginPath(),
            t.moveTo(E(s), I(s)),
            t.lineTo(E(a), I(a)),
            (t.strokeStyle = "rgba(4,8,6,.48)"),
            (t.lineWidth = l ? 8 : 7),
            t.stroke(),
            t.beginPath(),
            t.moveTo(E(s), I(s)),
            t.lineTo(E(a), I(a)),
            (t.strokeStyle = l
              ? "rgba(232,93,72,.55)"
              : "rgba(218,197,151,.28)"),
            (t.lineWidth = l ? 4 : 3),
            t.setLineDash(l ? [5, 8] : []),
            t.stroke(),
            t.setLineDash([]));
      }
      for (let e of m.current) {
        let r = n.current[e.from],
          s = n.current[e.to];
        (t.beginPath(),
          t.moveTo(E(r), I(r)),
          t.lineTo(E(s), I(s)),
          (t.strokeStyle = l[e.owner].main),
          (t.globalAlpha = 0.5),
          t.setLineDash([3, 7]),
          t.stroke(),
          t.setLineDash([]),
          (t.globalAlpha = 1));
      }
      if ("escort" === L.mode && L.path) {
        let e = Math.min(P.caravanIndex, L.path.length - 2),
          r = n.current[L.path[e]],
          s = n.current[L.path[e + 1]],
          a = P.caravanIndex >= L.path.length - 1 ? 1 : P.caravanProgress,
          l = E(r) + (E(s) - E(r)) * a,
          i = I(r) + (I(s) - I(r)) * a;
        ((t.fillStyle = "#f2c45d"),
          t.fillRect(l - 10, i - 7, 20, 12),
          (t.fillStyle = "#2c1b10"),
          t.beginPath(),
          t.arc(l - 6, i + 7, 3, 0, 7),
          t.arc(l + 6, i + 7, 3, 0, 7),
          t.fill(),
          (t.fillStyle = "#fff3cf"),
          (t.font = "800 9px var(--font-geist)"),
          (t.textAlign = "center"),
          t.fillText("CONVOI", l, i - 12));
      }
      for (let e of d.current) {
        if ("fog" === L.mode && "orcs" === e.owner && !eo(e.from) && !eo(e.to))
          continue;
        let r = n.current[e.from],
          s = n.current[e.to],
          a = E(r) + (E(s) - E(r)) * e.progress,
          i = I(r) + (I(s) - I(r)) * e.progress,
          o = l[e.owner],
          u = Math.atan2(I(s) - I(r), E(s) - E(r)),
          c = 1.5 * Math.sin(0.012 * performance.now() + e.id);
        (t.save(),
          (t.strokeStyle = o.main),
          (t.globalAlpha = 0.18),
          (t.lineWidth = 7),
          t.beginPath(),
          t.moveTo(a - 22 * Math.cos(u), i - 22 * Math.sin(u)),
          t.lineTo(a - 7 * Math.cos(u), i - 7 * Math.sin(u)),
          t.stroke(),
          (t.globalAlpha = 1),
          t.translate(a, i + c),
          t.rotate(u),
          (t.shadowColor = o.glow),
          (t.shadowBlur = 14),
          (t.fillStyle = "rgba(5,9,7,.94)"),
          t.beginPath(),
          t.moveTo(13, 0),
          t.lineTo(2, -11),
          t.lineTo(-11, -8),
          t.lineTo(-13, 0),
          t.lineTo(-11, 8),
          t.lineTo(2, 11),
          t.closePath(),
          t.fill(),
          (t.strokeStyle = o.main),
          (t.lineWidth = 2.5),
          t.stroke(),
          (t.shadowBlur = 0),
          (t.fillStyle = o.main),
          t.beginPath(),
          t.moveTo(10, 0),
          t.lineTo(-2, -6),
          t.lineTo(-2, 6),
          t.closePath(),
          t.fill(),
          (t.strokeStyle = "rgba(255,248,224,.65)"),
          (t.lineWidth = 1),
          t.beginPath(),
          t.moveTo(-4, -12),
          t.lineTo(-4, 11),
          t.stroke(),
          (t.fillStyle = o.main),
          t.beginPath(),
          t.moveTo(-4, -11),
          t.lineTo(-13, -8),
          t.lineTo(-4, -2),
          t.closePath(),
          t.fill(),
          t.rotate(-u),
          (t.fillStyle = "rgba(5,8,7,.94)"),
          t.beginPath(),
          t.roundRect(-15, -27, 30, 16, 8),
          t.fill(),
          (t.strokeStyle = o.main),
          (t.lineWidth = 1),
          t.stroke(),
          (t.fillStyle = "#fff7df"),
          (t.font = "900 10px var(--font-geist)"),
          (t.textAlign = "center"),
          t.fillText(String(Math.ceil(e.units)), 0, -16),
          t.restore());
      }
      if (null !== x.current && j.current) {
        let e = n.current[x.current];
        (t.beginPath(),
          t.moveTo(E(e), I(e)),
          t.lineTo(j.current.x, j.current.y),
          (t.strokeStyle =
            null === w.current ? "rgba(242,196,93,.72)" : "#fff3c7"),
          (t.lineWidth = 3),
          t.setLineDash([9, 7]),
          t.stroke(),
          t.setLineDash([]));
        let r = (E(e) + j.current.x) / 2,
          s = (I(e) + j.current.y) / 2;
        ((t.fillStyle = "rgba(5,9,7,.86)"),
          t.fillRect(r - 20, s - 10, 40, 20),
          (t.fillStyle = "#f8e9bf"),
          (t.font = "900 10px var(--font-geist)"),
          (t.textAlign = "center"),
          t.fillText(
            1 === v.current ? "TOUT" : 0.5 === v.current ? "½" : "¼",
            r,
            s + 4,
          ));
      }
      for (let e of n.current) {
        let r = E(e),
          n = I(e),
          s = !eo(e.id),
          a =
            ("fortress" === e.kind ? 27 : "tower" === e.kind ? 22 : 24) *
            Math.max(0.72, Math.min(1, c / 460));
        if (s) {
          (t.beginPath(),
            t.arc(r, n, a, 0, 7),
            (t.fillStyle = "rgba(5,9,7,.85)"),
            t.fill(),
            (t.strokeStyle = "#606a62"),
            t.stroke(),
            (t.fillStyle = "#929b94"),
            (t.font = "900 18px var(--font-geist)"),
            (t.textAlign = "center"),
            t.fillText("?", r, n + 6));
          continue;
        }
        let i = l[e.owner],
          o = x.current === e.id,
          u = w.current === e.id,
          isPowerTarget =
            commandPower.current.targeting && "humans" === e.owner,
          isBannered =
            commandPower.current.buffBaseId === e.id &&
            T.current < commandPower.current.buffUntil;
        let mission2Sprite =
          2 === L.id &&
          ["village", "fortress"].includes(e.kind) &&
          mission2Art.current[e.kind];
        if (mission2Sprite?.complete && mission2Sprite.naturalWidth) {
          let scale = Math.max(0.72, Math.min(1, c / 460)),
            spriteWidth = ("fortress" === e.kind ? 104 : 84) * scale,
            spriteHeight = spriteWidth * (320 / 384),
            labelY = n + 0.38 * spriteHeight;
          (t.save(),
            (t.shadowColor = i.glow),
            (t.shadowBlur =
              o || u || isPowerTarget || isBannered ? 24 : 13),
            t.beginPath(),
            t.arc(r, n, 0.48 * spriteWidth, 0, 7),
            (t.fillStyle = "rgba(7,11,8,.76)"),
            t.fill(),
            (t.strokeStyle =
              u || isPowerTarget || isBannered ? "#fff4d0" : i.main),
            (t.lineWidth = o || u || isPowerTarget || isBannered ? 4 : 3),
            t.stroke(),
            (t.shadowBlur = 0),
            t.drawImage(
              mission2Sprite,
              r - spriteWidth / 2,
              n - 0.54 * spriteHeight,
              spriteWidth,
              spriteHeight,
            ),
            t.beginPath(),
            t.roundRect(r - 18, labelY - 10, 36, 20, 10),
            (t.fillStyle = "rgba(5,8,7,.94)"),
            t.fill(),
            (t.strokeStyle = i.main),
            (t.lineWidth = 1.5),
            t.stroke(),
            (t.fillStyle = "#fff8e8"),
            (t.font = "900 12px var(--font-geist)"),
            (t.textAlign = "center"),
            t.fillText(String(Math.floor(e.units)), r, labelY + 4),
            t.restore());
          continue;
        }
        if (
          (t.save(),
          (t.shadowColor = i.glow),
          (t.shadowBlur = o || u || isPowerTarget || isBannered ? 25 : 11),
          t.beginPath(),
          t.arc(r, n, a + 8, 0, 7),
          (t.fillStyle = "rgba(8,13,11,.92)"),
          t.fill(),
          (t.strokeStyle = u || isPowerTarget || isBannered ? "#fff4d0" : i.main),
          (t.lineWidth = o || u || isPowerTarget || isBannered ? 4 : 2),
          t.stroke(),
          (t.shadowBlur = 0),
          (isPowerTarget || isBannered) &&
            ((t.strokeStyle = isBannered ? "#fff0a8" : "rgba(242,196,93,.72)"),
            (t.lineWidth = isBannered ? 3 : 2),
            t.setLineDash(isPowerTarget && !isBannered ? [5, 5] : []),
            t.beginPath(),
            t.arc(
              r,
              n,
              a + 16 + 2 * Math.sin(0.006 * performance.now()),
              0,
              7,
            ),
            t.stroke(),
            t.setLineDash([])),
          (t.globalAlpha = 0.38),
          (t.strokeStyle = i.main),
          (t.lineWidth = 2),
          t.beginPath(),
          t.arc(
            r,
            n,
            a + 12,
            -Math.PI / 2,
            -Math.PI / 2 + Math.PI * 2 * Math.min(1, e.units / 60),
          ),
          t.stroke(),
          (t.globalAlpha = 1),
          (t.fillStyle = i.dark),
          t.fillRect(r - 0.65 * a, n - 0.35 * a, 1.3 * a, 0.9 * a),
          (t.fillStyle = i.main),
          t.fillRect(r - 0.7 * a, n - 0.62 * a, 0.34 * a, 0.7 * a),
          t.fillRect(r + 0.36 * a, n - 0.62 * a, 0.34 * a, 0.7 * a),
          "fortress" === e.kind &&
            t.fillRect(r - 0.17 * a, n - 0.82 * a, 0.34 * a, 0.65 * a),
          "tower" === e.kind &&
            (t.beginPath(),
            t.moveTo(r, n - 0.88 * a),
            t.lineTo(r - 0.5 * a, n),
            t.lineTo(r + 0.5 * a, n),
            t.fill()),
          "neutral" !== e.owner &&
            ((t.strokeStyle = "#e9dfc7"),
            (t.lineWidth = 1.5),
            t.beginPath(),
            t.moveTo(r + 0.48 * a, n - 0.55 * a),
            t.lineTo(r + 0.48 * a, n - 1.18 * a),
            t.stroke(),
            (t.fillStyle = i.main),
            t.beginPath(),
            t.moveTo(r + 0.48 * a, n - 1.16 * a),
            t.lineTo(r + 1.02 * a, n - 0.98 * a),
            t.lineTo(r + 0.48 * a, n - 0.78 * a),
            t.closePath(),
            t.fill()),
          (t.fillStyle = "#161a17"),
          t.beginPath(),
          t.arc(r, n + 0.3 * a, 0.18 * a, Math.PI, 0),
          t.fill(),
          t.beginPath(),
          t.roundRect(r - 17, n + 0.65 * a - 9, 34, 19, 9),
          (t.fillStyle = "rgba(5,8,7,.95)"),
          t.fill(),
          (t.strokeStyle = i.main),
          (t.lineWidth = 1),
          t.stroke(),
          (t.fillStyle = "#fff8e8"),
          (t.font = "850 12px var(--font-geist)"),
          (t.textAlign = "center"),
          t.fillText(String(Math.floor(e.units)), r, n + 0.65 * a + 5),
          isBannered &&
            ((t.fillStyle = "#fff0a8"),
            (t.shadowColor = l.humans.glow),
            (t.shadowBlur = 12),
            (t.font = "900 17px var(--font-geist)"),
            t.fillText("♛", r, n - a - 13),
            (t.shadowBlur = 0)),
          e.special)
        ) {
          let s = {
            source: "∞ SOURCE",
            seal: "RUNE",
            boss: "BOSS",
            exit: "SORTIE",
            worksite: "PONT",
            relic: "COURONNE",
          };
          ((t.fillStyle = "boss" === e.special ? "#ff846f" : "#f5d77f"),
            (t.font = "900 8px var(--font-geist)"),
            t.fillText(s[e.special], r, n - a - 14));
        }
        t.restore();
      }
      for (let e of f.current) {
        let r = e.age / 0.9,
          n = 24 + (e.x + (e.vx || 0) * e.age) * b,
          s = 44 + (e.y + (e.vy || 0) * e.age + (e.kind === "spark" ? 0.09 * e.age * e.age : 0)) * M;
        if (e.kind === "spark") {
          (t.save(),
            (t.globalAlpha = 1 - r),
            (t.fillStyle = e.color),
            (t.shadowColor = e.color),
            (t.shadowBlur = 8),
            t.beginPath(),
            t.arc(n, s, 2.8 * (1 - r) + 0.6, 0, 7),
            t.fill(),
            t.restore());
          continue;
        }
        (t.save(),
          (t.globalAlpha = 1 - r),
          "CHOC" === e.text &&
            ((t.translate(n, s)),
            (t.rotate(0.35 * r)),
            (t.strokeStyle = "#fff2c4"),
            (t.lineWidth = 3 * (1 - r) + 1),
            (t.shadowColor = "#ff9c45"),
            (t.shadowBlur = 22 * (1 - r)),
            Array.from({ length: 12 }).forEach((_, e) => {
              let n = (e / 12) * Math.PI * 2,
                s = 9 + 18 * r,
                a = 25 + 34 * r + (e % 3) * 5;
              (t.beginPath(),
                t.moveTo(Math.cos(n) * s, Math.sin(n) * s),
                t.lineTo(Math.cos(n) * a, Math.sin(n) * a),
                t.stroke());
            }),
            t.rotate(-0.35 * r),
            t.translate(-n, -s)),
          (t.strokeStyle = e.color),
          (t.lineWidth = "CHOC" === e.text ? 5 : 3),
          t.beginPath(),
          t.arc(n, s, ("CHOC" === e.text ? 22 : 34) + 38 * r, 0, 7),
          t.stroke(),
          e.text &&
            ((t.fillStyle = "#fff7dc"),
            (t.font = `900 ${"CHOC" === e.text ? 15 : 12}px var(--font-geist)`),
            (t.textAlign = "center"),
            t.fillText(e.text, n, s - 34 - 24 * r)),
          t.restore());
      }
      if (activeFx.flash > 0) {
        ((t.fillStyle = `rgba(${activeFx.color},${Math.min(0.2, activeFx.flash * 0.22)})`),
          t.fillRect(0, 0, o, c));
      }
      s = requestAnimationFrame(u);
    };
    return (
      (s = requestAnimationFrame(u)),
      () => {
        (cancelAnimationFrame(s), o.disconnect());
      }
    );
  }, [et, ea, ei, es, er, gainCommand, immersiveSound]);
  let eu = (e) => {
      let r = e.currentTarget.getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        w: r.width,
        h: r.height,
      };
    },
    ec = (e, r, t, s) =>
      n.current.find(
        (n) =>
          45 > Math.hypot(24 + n.x * (t - 48) - e, 44 + n.y * (s - 68) - r),
      ),
    ed = (e) => {
      let r = x.current,
        t = w.current;
      if (
        ((x.current = null),
        (w.current = null),
        (j.current = null),
        null !== r && null !== t && r !== t)
      ) {
        if (!en(r, t))
          return (
            immersiveSound("invalid"),
            navigator.vibrate?.(35),
            void et("Aucune route directe")
          );
        if (b.current && "humans" === n.current[t].owner) {
          let e = m.current.find((e) => e.from === r && e.to === t);
          e
            ? ((m.current = m.current.filter((r) => r !== e)),
              immersiveSound("select"),
              et("Ravitaillement coupé"))
            : (m.current.push({
                from: r,
                to: t,
                owner: "humans",
                clock: 0,
              }),
              immersiveSound("magic"),
              et("Ravitaillement activé"));
          return;
        }
        (ei(r, t, "humans") && 1 === h.current.id && 0 === L.current && X(1),
          e.currentTarget.releasePointerCapture?.(e.pointerId));
      }
    },
    em = () => {
      "playing" === g.current
        ? ((g.current = "paused"), I("paused"))
        : "paused" === g.current &&
          ((y.current = performance.now()),
          (g.current = "playing"),
          I("playing"));
    },
    ef = s[O - 1],
    eh = c[O]?.[Q];
  return (0, r.jsxs)("main", {
    className: "game-shell",
    children: [
      (0, r.jsxs)("header", {
        className: "topbar",
        children: [
          (0, r.jsxs)("button", {
            className: "brand",
            onClick: () => A("campaign"),
            children: [
              (0, r.jsx)("span", { className: "crest", children: "♜" }),
              (0, r.jsxs)("span", {
                children: [
                  (0, r.jsx)("small", { children: "CHRONIQUES" }),
                  (0, r.jsx)("strong", {
                    children: "Royaumes en Guerre",
                  }),
                ],
              }),
            ],
          }),
          (0, r.jsxs)("div", {
            className: "territory-score",
            children: [
              (0, r.jsxs)("span", {
                children: [
                  (0, r.jsx)("i", { className: "human-dot" }),
                  Y.humans,
                ],
              }),
              (0, r.jsx)("em", {
                children: "battle" === P ? ef.name : "CAMPAGNE",
              }),
              (0, r.jsxs)("span", {
                children: [(0, r.jsx)("i", { className: "orc-dot" }), Y.orcs],
              }),
            ],
          }),
          (0, r.jsxs)("div", {
            className: "controls",
            children: [
              (0, r.jsx)("button", {
                onClick: () => F((e) => !e),
                "aria-label": "Son",
                children: H ? "×" : "♪",
              }),
              (0, r.jsx)("button", {
                onClick: () => W(!0),
                "aria-label": "Codex",
                children: "?",
              }),
              "battle" === P &&
                (0, r.jsx)("button", {
                  onClick: em,
                  "aria-label": "Pause",
                  children: "Ⅱ",
                }),
            ],
          }),
        ],
      }),
      (0, r.jsxs)("section", {
        className: "battle-card",
        children: [
          (0, r.jsx)("canvas", {
            ref: e,
            onPointerDown: (e) => {
              if ("playing" !== E) return;
              let r = eu(e),
                t = ec(r.x, r.y, r.w, r.h);
              if (commandPower.current.targeting) {
                t?.owner === "humans"
                  ? activateRoyalBanner(t.id)
                  : (immersiveSound("invalid"),
                    navigator.vibrate?.(35),
                    et("Touche une base alliée"));
                return;
              }
              t?.owner === "humans" &&
                (e.currentTarget.setPointerCapture(e.pointerId),
                (x.current = t.id),
                (j.current = { x: r.x, y: r.y }),
                immersiveSound("select"),
                er(340, 0.035, 0.02));
            },
            onPointerMove: (e) => {
              if (null === x.current) return;
              let r = eu(e),
                t = ec(r.x, r.y, r.w, r.h);
              ((j.current = { x: r.x, y: r.y }), (w.current = t?.id ?? null));
            },
            onPointerUp: ed,
            onPointerCancel: ed,
          }),
          "campaign" === P &&
            (0, r.jsxs)("div", {
              className: "campaign-overlay",
              children: [
                (0, r.jsxs)("div", {
                  className: "campaign-head",
                  children: [
                    (0, r.jsx)("p", {
                      children: "LA GUERRE DES DEUX PEUPLES",
                    }),
                    (0, r.jsx)("h1", { children: "La campagne" }),
                    (0, r.jsx)("span", {
                      children:
                        "Quinze champs de bataille. Cinq leçons, puis dix défis qui changent les règles.",
                    }),
                  ],
                }),
                (0, r.jsx)("div", {
                  className: "mission-grid",
                  children: s.map((e) => {
                    let t = e.id > _.unlocked,
                      n = _.crowns[e.id] || 0;
                    return (0, r.jsxs)(
                      "button",
                      {
                        disabled: t,
                        className: `mission-card ${t ? "locked" : ""}`,
                        onClick: () => openMission(e.id),
                        children: [
                          (0, r.jsx)("span", {
                            className: "mission-number",
                            children: String(e.id).padStart(2, "0"),
                          }),
                          (0, r.jsx)("small", { children: e.region }),
                          (0, r.jsx)("strong", { children: e.name }),
                          (0, r.jsx)("p", {
                            children: t ? "Mission verrouillée" : e.objective,
                          }),
                          (0, r.jsx)("em", {
                            children: t
                              ? "◆"
                              : `${"♛".repeat(n)}${"·".repeat(3 - n)}`,
                          }),
                        ],
                      },
                      e.id,
                    );
                  }),
                }),
              ],
            }),
          missionIntro &&
            (0, r.jsx)("div", {
              className: `mission-intro terrain-${missionIntro.terrain}`,
              children: (0, r.jsxs)("div", {
                className: "mission-intro-panel",
                children: [
                  (0, r.jsxs)("div", {
                    className: "intro-standard",
                    children: [
                      (0, r.jsx)("span", { children: "♜" }),
                      (0, r.jsx)("i", {}),
                    ],
                  }),
                  (0, r.jsx)("small", {
                    children: missionScenes[missionIntro.id]?.chapter,
                  }),
                  (0, r.jsx)("span", {
                    className: "intro-region",
                    children: missionIntro.region,
                  }),
                  (0, r.jsx)("h2", { children: missionIntro.name }),
                  (0, r.jsx)("p", {
                    className: "intro-scene",
                    children:
                      missionScenes[missionIntro.id]?.scene ||
                      missionIntro.briefing,
                  }),
                  (0, r.jsxs)("div", {
                    className: "intro-order",
                    children: [
                      (0, r.jsx)("span", { children: "ORDRE DE BATAILLE" }),
                      (0, r.jsx)("b", {
                        children:
                          missionScenes[missionIntro.id]?.rule ||
                          missionIntro.objective,
                      }),
                    ],
                  }),
                  6 === missionIntro.id &&
                    (0, r.jsxs)("div", {
                      className: "intro-power",
                      children: [
                        (0, r.jsx)("span", { children: "♛" }),
                        (0, r.jsxs)("p", {
                          children: [
                            (0, r.jsx)("small", {
                              children: "NOUVEAU POUVOIR",
                            }),
                            (0, r.jsx)("b", {
                              children: "La Bannière du Roi",
                            }),
                            "Une fois la jauge pleine, rallie 25 % des garnisons voisines et accélère la production de la base choisie.",
                          ],
                        }),
                      ],
                    }),
                  (0, r.jsxs)("div", {
                    className: "intro-actions",
                    children: [
                      (0, r.jsx)("button", {
                        className: "primary-button",
                        onClick: () => el(missionIntro.id),
                        children: "Entrer sur le champ",
                      }),
                      (0, r.jsx)("button", {
                        className: "secondary-button",
                        onClick: () => setMissionIntro(null),
                        children: "Retour à la campagne",
                      }),
                    ],
                  }),
                ],
              }),
            }),
          "battle" === P &&
            (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsxs)("div", {
                  className: "objective-chip",
                  children: [
                    (0, r.jsx)("span", { children: "OBJECTIF" }),
                    (0, r.jsx)("b", { children: z }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "dispatch-panel",
                  children: [
                    (0, r.jsx)("small", { children: "ENVOI" }),
                    [0.25, 0.5, 1].map((e) =>
                      (0, r.jsx)(
                        "button",
                        {
                          className: D === e ? "active" : "",
                          onClick: () => U(e),
                          children: 1 === e ? "TOUT" : 0.5 === e ? "½" : "¼",
                        },
                        e,
                      ),
                    ),
                    (0, r.jsx)("button", {
                      className: `supply-toggle ${$ ? "active" : ""}`,
                      onClick: () => B((e) => !e),
                      children: "↻ RAVITAILLEMENT",
                    }),
                  ],
                }),
                O >= 6 &&
                  (0, r.jsxs)("div", {
                    className: `command-power ${commandUi.targeting ? "targeting" : ""} ${commandUi.charge >= 100 ? "ready" : ""}`,
                    children: [
                      (0, r.jsxs)("div", {
                        className: "command-meter",
                        children: [
                          (0, r.jsxs)("span", {
                            children: [
                              (0, r.jsx)("small", {
                                children: "COMMANDEMENT",
                              }),
                              (0, r.jsx)("b", {
                                children: commandUi.active
                                  ? `Bannière active · ${commandUi.active}s`
                                  : commandUi.targeting
                                    ? "Choisis une base alliée"
                                    : commandUi.charge >= 100
                                      ? "Bannière prête"
                                      : `${Math.floor(commandUi.charge)} %`,
                              }),
                            ],
                          }),
                          (0, r.jsx)("i", {
                            children: (0, r.jsx)("em", {
                              style: {
                                width: `${Math.min(100, commandUi.charge)}%`,
                              },
                            }),
                          }),
                        ],
                      }),
                      (0, r.jsxs)("button", {
                        onClick: beginPowerTargeting,
                        disabled:
                          commandUi.charge < 100 && !commandUi.targeting,
                        "aria-label": "Bannière du Roi",
                        children: [
                          (0, r.jsx)("strong", { children: "♛" }),
                          (0, r.jsx)("small", {
                            children: commandUi.targeting
                              ? "ANNULER"
                              : "BANNIÈRE",
                          }),
                        ],
                      }),
                    ],
                  }),
                eh &&
                  "playing" === E &&
                  (0, r.jsxs)("div", {
                    className: "tutorial-card",
                    children: [
                      (0, r.jsxs)("small", {
                        children: ["LEÇON ", O, "/4"],
                      }),
                      (0, r.jsx)("strong", { children: eh.title }),
                      (0, r.jsx)("p", { children: eh.text }),
                    ],
                  }),
                G &&
                  (0, r.jsx)("div", {
                    className: "action-toast",
                    children: G,
                  }),
                "paused" === E &&
                  (0, r.jsx)("div", {
                    className: "modal-overlay",
                    children: (0, r.jsxs)("div", {
                      children: [
                        (0, r.jsx)("small", {
                          children: "MISSION EN PAUSE",
                        }),
                        (0, r.jsx)("h2", { children: ef.name }),
                        (0, r.jsx)("button", {
                          className: "primary-button",
                          onClick: em,
                          children: "Reprendre",
                        }),
                        (0, r.jsx)("button", {
                          className: "secondary-button",
                          onClick: () => A("campaign"),
                          children: "Quitter",
                        }),
                      ],
                    }),
                  }),
                ("won" === E || "lost" === E) &&
                  (0, r.jsx)("div", {
                    className: "modal-overlay result",
                    children: (0, r.jsxs)("div", {
                      children: [
                        (0, r.jsx)("small", {
                          children: "won" === E ? "VICTOIRE" : "DÉFAITE",
                        }),
                        (0, r.jsx)("h2", {
                          children:
                            "won" === E
                              ? "Le royaume avance"
                              : "La Horde l’emporte",
                        }),
                        "won" === E &&
                          (0, r.jsx)("p", {
                            children: "♛".repeat(_.crowns[O] || 1),
                          }),
                        (0, r.jsx)("button", {
                          className: "primary-button",
                          onClick: () =>
                            "won" === E && O < 15
                              ? openMission(O + 1)
                              : el(O),
                          children:
                            "won" === E && O < 15
                              ? "Mission suivante"
                              : "Rejouer",
                        }),
                        (0, r.jsx)("button", {
                          className: "secondary-button",
                          onClick: () => A("campaign"),
                          children: "Carte de campagne",
                        }),
                      ],
                    }),
                  }),
              ],
            }),
          V &&
            (0, r.jsx)("div", {
              className: "modal-overlay codex",
              children: (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("button", {
                    className: "close",
                    onClick: () => W(!1),
                    children: "×",
                  }),
                  (0, r.jsx)("small", {
                    children: "CODEX DU COMMANDANT",
                  }),
                  (0, r.jsx)("h2", { children: "Les règles du front" }),
                  (0, r.jsxs)("div", {
                    className: "codex-grid",
                    children: [
                      (0, r.jsxs)("p", {
                        children: [
                          (0, r.jsx)("b", { children: "Village" }),
                          "Produit rapidement des soldats.",
                        ],
                      }),
                      (0, r.jsxs)("p", {
                        children: [
                          (0, r.jsx)("b", { children: "Forteresse" }),
                          "Réduit les dégâts des assauts.",
                        ],
                      }),
                      (0, r.jsxs)("p", {
                        children: [
                          (0, r.jsx)("b", { children: "Tour" }),
                          "Accélère les armées qui en partent.",
                        ],
                      }),
                      (0, r.jsxs)("p", {
                        children: [
                          (0, r.jsx)("b", { children: "Envoi" }),
                          "Choisis ¼, ½ ou toutes les troupes disponibles.",
                        ],
                      }),
                      (0, r.jsxs)("p", {
                        children: [
                          (0, r.jsx)("b", { children: "Routes" }),
                          "Deux armées ennemies se heurtent en chemin.",
                        ],
                      }),
                      (0, r.jsxs)("p", {
                        children: [
                          (0, r.jsx)("b", {
                            children: "Ravitaillement",
                          }),
                          "Crée une ligne automatique entre deux positions alliées.",
                        ],
                      }),
                      (0, r.jsxs)("p", {
                        children: [
                          (0, r.jsx)("b", {
                            children: "Bannière du Roi",
                          }),
                          "Dès la mission 6, remplis la jauge en combattant et en capturant. Cible une base alliée pour y rallier 25 % des garnisons voisines et accélérer sa production pendant 8 secondes.",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
        ],
      }),
      (0, r.jsxs)("footer", {
        className: "battle-hint",
        children: [
          (0, r.jsx)("span", {
            children:
              "battle" === P
                ? "GLISSE D’UNE BASE JAUNE VERS UNE BASE RELIÉE"
                : "CHOISIS TON PROCHAIN FRONT",
          }),
          (0, r.jsx)("b", {
            children:
              "battle" === P
                ? `${Math.floor(Y.time / 60)}:${String(Y.time % 60).padStart(2, "0")}`
                : `${Object.values(_.crowns).reduce((e, r) => e + r, 0)} COURONNES`,
          }),
        ],
      }),
      (0, r.jsxs)("div", {
        className: "portrait-guard",
        children: [
          (0, r.jsx)("div", {
            className: "rotate-icon",
            children: "↻",
          }),
          (0, r.jsx)("h2", { children: "Tourne ton royaume" }),
          (0, r.jsx)("p", {
            children: "Royaumes en Guerre se joue uniquement en mode paysage.",
          }),
        ],
      }),
    ],
  });
}
