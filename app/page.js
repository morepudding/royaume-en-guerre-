"use client";

import * as React from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { createImmersionAudio } from "./immersion-audio";
import {
  countCrowns,
  evaluateMissionCrowns,
  evaluateMissionOutcome,
  getCrownDefinitions,
  mergeCrownSets,
  normalizeCrownProgress,
} from "./game/mission-rules.mjs";

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
      objective: "Répare le pont puis élimine la Horde",
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
    city: { production: 1, defense: 1, speed: 1 },
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
    caravanHealth: 100,
    caravanRouteBrokenEver: !1,
    betrayalDone: !1,
    betrayedBaseId: null,
    dawnDone: !1,
    dawnReinforcement: null,
    nextWave: 7,
    waveCount: 0,
    lostHumanBase: !1,
    sealsOpened: !1,
    bossOpened: !1,
  }),
  u = (e) =>
    e.bases.map((r) => ({
      ...r,
      kind:
        e.id >= 2 && !r.special && ["village", "tower"].includes(r.kind)
          ? "city"
          : r.kind,
      specialization: null,
      construction: null,
    })),
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
        title: "Bâtis ton premier village",
        text: "Capture une ville, touche-la puis transforme-la en village productif.",
      },
    ],
    3: [
      {
        title: "Débloque la forteresse",
        text: "Une ville peut maintenant devenir un village ou une forteresse résistante.",
      },
    ],
    4: [
      {
        title: "Débloque la tour",
        text: "Les trois constructions sont disponibles. La tour accélère les armées qui en partent.",
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
      rule: "Chantier · Livre 40 soldats, rouvre la route puis élimine la Horde",
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

const developmentChoices = {
  city: [
    {
      id: "raise-village",
      icon: "♟",
      label: "Village",
      description: "Forte production",
      cost: 10,
      duration: 5,
      kind: "village",
    },
    {
      id: "raise-fortress",
      icon: "♜",
      label: "Forteresse",
      description: "Défense renforcée",
      cost: 10,
      duration: 5,
      kind: "fortress",
    },
    {
      id: "raise-tower",
      icon: "▲",
      label: "Tour",
      description: "Armées plus rapides",
      cost: 10,
      duration: 5,
      kind: "tower",
    },
  ],
  village: [
    {
      id: "granary",
      icon: "✦",
      label: "Grenier royal",
      description: "+27 % production",
      cost: 12,
      duration: 6,
      stats: { production: 2.1 },
    },
    {
      id: "walled-borough",
      icon: "◆",
      label: "Bourg fortifié",
      description: "+18 % défense · production légèrement réduite",
      cost: 12,
      duration: 6,
      stats: { production: 1.55, defense: 1.18 },
    },
  ],
  fortress: [
    {
      id: "citadel",
      icon: "♜",
      label: "Citadelle",
      description: "+27 % défense · production réduite",
      cost: 12,
      duration: 6,
      stats: { production: 0.8, defense: 1.72 },
    },
    {
      id: "bastide",
      icon: "♛",
      label: "Bastide",
      description: "+39 % production · +5 % défense",
      cost: 12,
      duration: 6,
      stats: { production: 1.25, defense: 1.42 },
    },
  ],
  tower: [
    {
      id: "royal-relay",
      icon: "➶",
      label: "Relais royal",
      description: "+30 % vitesse",
      cost: 12,
      duration: 6,
      stats: { speed: 1.95 },
    },
    {
      id: "watchtower",
      icon: "◈",
      label: "Tour de garde",
      description: "+25 % défense · production améliorée",
      cost: 12,
      duration: 6,
      stats: { production: 1.2, defense: 1.25, speed: 1.55 },
    },
  ],
};

const developmentById = Object.values(developmentChoices)
  .flat()
  .reduce((choices, choice) => ({ ...choices, [choice.id]: choice }), {});

const getDevelopmentChoices = (base, missionId = 15) => {
  if (
    !base ||
    missionId < 2 ||
    base.special ||
    base.invulnerable ||
    base.construction ||
    base.specialization
  )
    return [];
  if (base.kind === "city") {
    if (missionId === 2) return developmentChoices.city.slice(0, 1);
    if (missionId === 3) return developmentChoices.city.slice(0, 2);
    return developmentChoices.city;
  }
  return missionId >= 6 ? developmentChoices[base.kind] || [] : [];
};

const getBaseStats = (base) => {
  let baseStats = a[base.kind] || a.city,
    specialization = developmentById[base.specialization];
  return specialization?.stats
    ? { ...baseStats, ...specialization.stats }
    : baseStats;
};

const getMissionObjectivePriority = (mission, base, runtime) => {
  if (!mission || !base) return 0;
  switch (mission.mode) {
    case "defense":
      return base.id === (mission.target || 0) ? 42 : 0;
    case "escort": {
      let pathIndex = mission.path?.indexOf(base.id) ?? -1;
      return pathIndex >= 0
        ? 18 + 6 * Math.max(0, pathIndex - (runtime.caravanIndex || 0))
        : 0;
    }
    case "evacuation":
      return base.special === "exit" ? 44 : 0;
    case "seals":
      return mission.specialIds?.includes(base.id) ? 34 : 0;
    case "boss":
      return mission.specialIds?.includes(base.id)
        ? 28
        : base.id === mission.target
          ? 20
          : 0;
    case "bridge":
      return base.special === "worksite" ? 38 : 0;
    case "relic":
      return base.special === "relic" ? 46 : 0;
    case "dawn":
      return mission.specialIds?.includes(base.id) ? 34 : 0;
    default:
      return base.special ? 12 : 0;
  }
};

const addReinforcements = (bases, owner, amount, preferredId) => {
  let remaining = Math.max(0, amount),
    targets = bases
      .filter((base) => base.owner === owner && !base.invulnerable)
      .sort(
        (left, right) =>
          Number(right.id === preferredId) - Number(left.id === preferredId) ||
          left.units - right.units,
      );
  for (let base of targets) {
    let added = Math.min(remaining, Math.max(0, 99 - base.units));
    base.units += added;
    remaining -= added;
    if (remaining <= 0) break;
  }
  return amount - remaining;
};

const buildingNames = {
  city: "Ville niveau I",
  village: "Village",
  fortress: "Forteresse",
  tower: "Tour",
};

const getBattlefieldLayout = (width, height) => {
  let horizontal = Math.max(58, Math.min(78, 0.065 * width)),
    top = Math.max(88, Math.min(104, 0.18 * height)),
    bottom = Math.max(78, Math.min(88, 0.15 * height));
  return {
    left: horizontal,
    top,
    width: Math.max(1, width - 2 * horizontal),
    height: Math.max(1, height - top - bottom),
  };
};

const publicAssetBase = "";

const buildingAssetSources = {
  humans: {
    city: `${publicAssetBase}/assets/mission-2/village.png`,
    village: `${publicAssetBase}/assets/mission-2/village.png`,
    fortress: `${publicAssetBase}/assets/mission-2/fortress.png`,
    tower: `${publicAssetBase}/assets/buildings/human-tower.webp`,
  },
  neutral: {
    city: `${publicAssetBase}/assets/mission-2/village.png`,
    village: `${publicAssetBase}/assets/mission-2/village.png`,
    fortress: `${publicAssetBase}/assets/mission-2/fortress.png`,
    tower: `${publicAssetBase}/assets/buildings/human-tower.webp`,
  },
  orcs: {
    city: `${publicAssetBase}/assets/buildings/orc-village.webp`,
    village: `${publicAssetBase}/assets/buildings/orc-village.webp`,
    fortress: `${publicAssetBase}/assets/buildings/orc-fortress.webp`,
    tower: `${publicAssetBase}/assets/buildings/orc-tower.webp`,
  },
};

const missionMapSources = Object.fromEntries(
  Array.from({ length: 15 }, (_, index) => {
    let id = index + 1;
    return [
      id,
      `${publicAssetBase}/assets/maps/mission-${String(id).padStart(2, "0")}.webp`,
    ];
  }),
);

const missionVisuals = {
  1: {
    palette: ["#3d6844", "#24452f", "#4b3822"],
    accent: "#d9c27d",
    architecture: "marches",
    landmarks: [["fields", 0.49, 0.2, 0.18], ["woods", 0.5, 0.82, 0.17]],
  },
  2: {
    palette: ["#426552", "#1d4943", "#695338"],
    accent: "#9cc9bd",
    architecture: "river",
    landmarks: [["reeds", 0.5, 0.12, 0.16], ["reeds", 0.54, 0.88, 0.17]],
  },
  3: {
    palette: ["#385d3c", "#263d2b", "#59442c"],
    accent: "#c8b58c",
    architecture: "royal",
    landmarks: [["ruins", 0.5, 0.17, 0.17], ["ruins", 0.5, 0.84, 0.16]],
  },
  4: {
    palette: ["#34453d", "#202e2a", "#554436"],
    accent: "#b8c7bd",
    architecture: "mountain",
    landmarks: [["peaks", 0.28, 0.13, 0.23], ["peaks", 0.7, 0.86, 0.2]],
  },
  5: {
    palette: ["#436346", "#203c2c", "#61452b"],
    accent: "#bdc878",
    architecture: "valley",
    landmarks: [["ridge", 0.5, 0.5, 0.19], ["woods", 0.5, 0.08, 0.12]],
  },
  6: {
    palette: ["#3d4940", "#232f2b", "#5d422f"],
    accent: "#e2a756",
    architecture: "amber",
    landmarks: [["walls", 0.5, 0.14, 0.27], ["camps", 0.12, 0.5, 0.13]],
  },
  7: {
    palette: ["#4a5544", "#29382f", "#5e4633"],
    accent: "#d48b54",
    architecture: "ash",
    landmarks: [["fires", 0.55, 0.15, 0.16], ["fires", 0.48, 0.86, 0.15]],
  },
  8: {
    palette: ["#244944", "#172f2e", "#403e2b"],
    accent: "#76d4c0",
    architecture: "rune",
    landmarks: [["monoliths", 0.5, 0.13, 0.19], ["pools", 0.5, 0.87, 0.17]],
  },
  9: {
    palette: ["#4d4f3b", "#30392d", "#673829"],
    accent: "#ef835d",
    architecture: "burned",
    landmarks: [["fires", 0.42, 0.16, 0.2], ["fires", 0.42, 0.84, 0.2]],
  },
  10: {
    palette: ["#343a36", "#222a28", "#4e3530"],
    accent: "#cf6659",
    architecture: "basalt",
    landmarks: [["peaks", 0.52, 0.12, 0.26], ["monoliths", 0.53, 0.87, 0.2]],
  },
  11: {
    palette: ["#273f3b", "#162f30", "#493a30"],
    accent: "#75a8ae",
    architecture: "blackriver",
    landmarks: [["reeds", 0.5, 0.14, 0.18], ["ruins", 0.52, 0.86, 0.16]],
  },
  12: {
    palette: ["#4b5d3e", "#273b2c", "#56322e"],
    accent: "#c86d68",
    architecture: "vermeil",
    landmarks: [["fields", 0.5, 0.14, 0.2], ["camps", 0.5, 0.87, 0.14]],
  },
  13: {
    palette: ["#183b35", "#102a28", "#263227"],
    accent: "#829d8a",
    architecture: "forest",
    landmarks: [["woods", 0.5, 0.13, 0.28], ["woods", 0.5, 0.88, 0.27]],
  },
  14: {
    palette: ["#496746", "#28432f", "#665036"],
    accent: "#f0d17c",
    architecture: "crown",
    landmarks: [["ruins", 0.5, 0.13, 0.22], ["fields", 0.5, 0.87, 0.2]],
  },
  15: {
    palette: ["#5d5945", "#343d31", "#744333"],
    accent: "#f0a25d",
    architecture: "dawn",
    landmarks: [["ridge", 0.5, 0.13, 0.26], ["camps", 0.5, 0.88, 0.18]],
  },
};

const drawMissionLandmarks = (ctx, width, height, mission) => {
  let visual = missionVisuals[mission.id] || missionVisuals[1];
  ctx.save();
  for (let [type, px, py, size] of visual.landmarks) {
    let x = px * width,
      y = py * height,
      radius = size * Math.min(width, height);
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = 0.5;
    if ("fields" === type) {
      ctx.strokeStyle = visual.accent;
      ctx.lineWidth = 1.2;
      for (let line = -3; line <= 3; line++) {
        ctx.beginPath();
        ctx.ellipse(0, line * radius * 0.16, radius, radius * 0.2, -0.08, 0, 7);
        ctx.stroke();
      }
    } else if ("woods" === type) {
      for (let tree = 0; tree < 13; tree++) {
        let angle = tree * 2.4,
          distance = radius * (0.18 + (tree % 5) * 0.16),
          tx = Math.cos(angle) * distance,
          ty = Math.sin(angle) * distance * 0.5;
        ctx.fillStyle = tree % 2 ? "#10251a" : "#1a3522";
        ctx.beginPath();
        ctx.moveTo(tx, ty - 11);
        ctx.lineTo(tx - 7, ty + 7);
        ctx.lineTo(tx + 7, ty + 7);
        ctx.fill();
      }
    } else if ("peaks" === type || "ridge" === type) {
      ctx.fillStyle = "rgba(8,12,10,.65)";
      for (let peak = -2; peak <= 2; peak++) {
        let offset = peak * radius * 0.4,
          peakHeight = radius * (0.45 + 0.12 * (peak % 2));
        ctx.beginPath();
        ctx.moveTo(offset - radius * 0.42, radius * 0.24);
        ctx.lineTo(offset, -peakHeight);
        ctx.lineTo(offset + radius * 0.42, radius * 0.24);
        ctx.fill();
      }
    } else if ("ruins" === type || "walls" === type) {
      ctx.strokeStyle = visual.accent;
      ctx.lineWidth = "walls" === type ? 5 : 3;
      ctx.setLineDash("walls" === type ? [16, 7] : [9, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, radius, Math.PI * 0.08, Math.PI * 0.92);
      ctx.stroke();
      ctx.setLineDash([]);
      for (let pillar = -2; pillar <= 2; pillar++) {
        ctx.fillStyle = "rgba(15,19,16,.72)";
        ctx.fillRect(pillar * radius * 0.35 - 3, -8, 6, 22 - 3 * Math.abs(pillar));
      }
    } else if ("reeds" === type) {
      ctx.strokeStyle = visual.accent;
      ctx.lineWidth = 1.2;
      for (let reed = -7; reed <= 7; reed++) {
        let rx = reed * radius * 0.12,
          rh = 10 + ((reed + 9) % 4) * 5;
        ctx.beginPath();
        ctx.moveTo(rx, 7);
        ctx.quadraticCurveTo(rx + 3, -rh * 0.4, rx - 1, -rh);
        ctx.stroke();
      }
    } else if ("fires" === type || "camps" === type) {
      for (let fire = -2; fire <= 2; fire++) {
        let fx = fire * radius * 0.38,
          fy = (fire % 2) * radius * 0.12;
        ctx.fillStyle = "rgba(12,12,9,.72)";
        ctx.beginPath();
        ctx.moveTo(fx - 10, fy + 8);
        ctx.lineTo(fx, fy - 13);
        ctx.lineTo(fx + 10, fy + 8);
        ctx.fill();
        if ("fires" === type) {
          ctx.fillStyle = "#dc6b3f";
          ctx.beginPath();
          ctx.arc(fx + 12, fy + 5, 3.5, 0, 7);
          ctx.fill();
        }
      }
    } else if ("monoliths" === type) {
      ctx.strokeStyle = visual.accent;
      ctx.fillStyle = "rgba(9,14,12,.78)";
      for (let stone = -2; stone <= 2; stone++) {
        let sx = stone * radius * 0.35,
          sh = 20 + 5 * (stone % 2);
        ctx.fillRect(sx - 5, -sh, 10, sh + 6);
        ctx.strokeRect(sx - 5, -sh, 10, sh + 6);
      }
    } else if ("pools" === type) {
      ctx.fillStyle = visual.accent;
      for (let pool = -1; pool <= 1; pool++) {
        ctx.globalAlpha = 0.13;
        ctx.beginPath();
        ctx.ellipse(pool * radius * 0.55, 0, radius * 0.4, radius * 0.14, -0.1, 0, 7);
        ctx.fill();
      }
    }
    ctx.restore();
  }
  ctx.restore();
};

export default function Game() {
  let e = (0, t.useRef)(null),
    n = (0, t.useRef)(u(s[0])),
    d = (0, t.useRef)([]),
    m = (0, t.useRef)([]),
    f = (0, t.useRef)([]),
    h = (0, t.useRef)(s[0]),
    g = (0, t.useRef)("playing"),
    p = (0, t.useRef)("home"),
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
    orcMind = (0, t.useRef)({
      plan: null,
      nextThinkAt: 0,
      nextBuildAt: 10,
    }),
    audioEngine = (0, t.useRef)(null),
    battleFx = (0, t.useRef)({ shake: 0, flash: 0, color: "242,196,93" }),
    buildingArt = (0, t.useRef)({ humans: {}, neutral: {}, orcs: {} }),
    missionMapArt = (0, t.useRef)({}),
    suspensions = (0, t.useRef)(new Set()),
    [P, A] = (0, t.useState)("home"),
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
    [selectedMission, setSelectedMission] = (0, t.useState)(null),
    [battleReport, setBattleReport] = (0, t.useState)(null),
    [buildMenu, setBuildMenu] = (0, t.useState)(null),
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
          let unlocked = Number(r.unlocked);
          ee({
            unlocked: Number.isFinite(unlocked)
              ? Math.max(1, Math.min(15, Math.floor(unlocked)))
              : 1,
            crowns: normalizeCrownProgress(r.crowns),
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
        M.current?.close?.().catch?.(() => void 0);
      },
      [],
    ));
  (0, t.useEffect)(() => {
    V ? suspensions.current.add("codex") : suspensions.current.delete("codex");
    if (P !== "battle" || E !== "playing" || suspensions.current.size)
      audioEngine.current?.pause?.();
    else {
      y.current = performance.now();
      audioEngine.current?.resumeBattle?.();
    }
  }, [E, P, V]);
  (0, t.useEffect)(() => {
    let portrait = window.matchMedia("(orientation: portrait)"),
      syncEnvironment = () => {
        document.hidden
          ? suspensions.current.add("hidden")
          : suspensions.current.delete("hidden");
        portrait.matches
          ? suspensions.current.add("portrait")
          : suspensions.current.delete("portrait");
        if (suspensions.current.size) audioEngine.current?.pause?.();
        else if (p.current === "battle" && g.current === "playing") {
          y.current = performance.now();
          audioEngine.current?.resumeBattle?.();
        }
      };
    document.addEventListener("visibilitychange", syncEnvironment);
    portrait.addEventListener?.("change", syncEnvironment);
    syncEnvironment();
    return () => {
      document.removeEventListener("visibilitychange", syncEnvironment);
      portrait.removeEventListener?.("change", syncEnvironment);
    };
  }, []);
  (0, t.useEffect)(() => {
    let cancelled = !1;
    for (let [faction, sources] of Object.entries(buildingAssetSources)) {
      for (let [kind, source] of Object.entries(sources)) {
        let image = new Image();
        image.decoding = "async";
        image.onload = () => {
          if (!cancelled) buildingArt.current[faction][kind] = image;
        };
        image.onerror = () => {
          if (!cancelled) delete buildingArt.current[faction][kind];
        };
        image.src = source;
      }
    }
    return () => {
      cancelled = !0;
    };
  }, []);
  (0, t.useEffect)(() => {
    let cancelled = !1;
    let requestedIds = new Set(
      [O, O + 1, selectedMission?.id, missionIntro?.id].filter(
        (id) => id >= 1 && id <= 15,
      ),
    );
    for (let id of requestedIds) {
      if (missionMapArt.current[id]) continue;
      let source = missionMapSources[id],
        image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (!cancelled) missionMapArt.current[id] = image;
      };
      image.onerror = () => {
        if (!cancelled) delete missionMapArt.current[id];
      };
      image.src = source;
    }
    return () => {
      cancelled = !0;
    };
  }, [O, selectedMission?.id, missionIntro?.id]);
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
          return `Convoi : ${Math.min(e.path?.length || 1, r.caravanIndex + 1)}/${e.path?.length || 1} · ${Math.ceil(r.caravanHealth)} %`;
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
        if ("playing" !== g.current) return;
        let r = h.current,
          t = k.current,
          a = Math.floor(T.current),
          l = "won" === e,
          crownSet = evaluateMissionCrowns({
            mission: r,
            runtime: t,
            bases: n.current,
            elapsed: T.current,
            outcome: e,
          }),
          o = countCrowns(crownSet),
          u = n.current.filter((e) => "humans" === e.owner),
          c = Math.floor(u.reduce((e, r) => e + r.units, 0));
        ((g.current = e),
          I(e),
          setBattleReport({
            outcome: e,
            time: a,
            par: r.par,
            crowns: crownSet,
            crownCount: o,
            bases: u.length,
            troops: c,
            keptEveryBase: !t.lostHumanBase,
          }),
          er(l ? 880 : 130, 0.35, 0.06),
          immersiveSound(l ? "victory" : "defeat"),
          (battleFx.current.shake = l ? 5 : 12),
          (battleFx.current.flash = 0.65),
          (battleFx.current.color = l ? "242,196,93" : "232,93,72"),
          navigator.vibrate?.(l ? [35, 45, 70] : [90, 40, 120]));
        if (l)
          ee((e) => {
            let t = {
              unlocked: Math.max(e.unlocked, Math.min(15, r.id + 1)),
              crowns: {
                ...e.crowns,
                [r.id]: mergeCrownSets(e.crowns[r.id], crownSet),
              },
            };
            try {
              localStorage.setItem(i, JSON.stringify(t));
            } catch {}
            return t;
          });
      },
      [er, immersiveSound],
    ),
    el = (0, t.useCallback)(
      (e) => {
        let r = s[e - 1];
        (setMissionIntro(null),
          setSelectedMission(null),
          setBattleReport(null),
          setBuildMenu(null),
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
          (orcMind.current = {
            plan: null,
            nextThinkAt: r.id <= 4 ? 2.8 : 1.4,
            nextBuildAt: 9,
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
          audioEngine.current.setMuted(N.current),
          audioEngine.current.startBattle(r.terrain, r.mode));
      },
      [er],
    ),
    openMission = (0, t.useCallback)(
      (e) => {
        let r = s[e - 1];
        (A("campaign"), setSelectedMission(r));
      },
      [],
    ),
    gainCommand = (0, t.useCallback)((e) => {
      if (h.current.id < 6 || e <= 0) return;
      let r = commandPower.current,
        n = Math.min(100, r.charge + e);
      ((r.charge = n),
        setCommandUi((e) => ({ ...e, charge: n })));
    }, []),
    startDevelopment = (0, t.useCallback)(
      (baseId, choiceId, owner = "humans") => {
        if (h.current.id < 2 || "playing" !== g.current) return !1;
        let base = n.current[baseId],
          choice = getDevelopmentChoices(base, h.current.id).find(
            (option) => option.id === choiceId,
          ),
          reserve = "humans" === owner ? 1 : 6;
        if (!base || base.owner !== owner || !choice) return !1;
        if (base.units < choice.cost + reserve) {
          "humans" === owner && et(`Il faut ${choice.cost} soldats disponibles`);
          return !1;
        }
        return (
          (base.units -= choice.cost),
          (base.construction = {
            optionId: choice.id,
            owner,
            startedAt: T.current,
            finishAt: T.current + choice.duration,
          }),
          f.current.push({
            id: C.current++,
            x: base.x,
            y: base.y,
            color: l[owner].main,
            text: "CHANTIER",
            age: 0,
          }),
          "humans" === owner &&
            (setBuildMenu(null),
            h.current.id >= 2 && h.current.id <= 4 && X(1),
            immersiveSound("repair"),
            er(610, 0.1, 0.035),
            navigator.vibrate?.(24),
            et(`${choice.label} en construction`)),
          !0
        );
      },
      [er, et, immersiveSound],
    ),
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
            speed:
              getBaseStats(i).speed *
              ("boss" === h.current.mode &&
              "orcs" === t &&
              "orcs" === n.current[h.current.specialIds?.[0]]?.owner
                ? 1.25
                : 1),
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
      pauseTimer = 0,
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
    if (P !== "battle") return () => o.disconnect();
    let u = (e) => {
      let i = r.getBoundingClientRect(),
        o = i.width,
        c = i.height,
        battlefield = getBattlefieldLayout(o, c),
        b = battlefield.width,
        M = battlefield.height,
        N = Math.min((e - (y.current || e)) / 1e3, 0.05);
      y.current = e;
      let L = h.current,
        P = k.current;
      if ("playing" !== g.current || suspensions.current.size) {
        r.style.transform = "translate3d(0,0,0)";
        pauseTimer = window.setTimeout(() => {
          s = requestAnimationFrame(u);
        }, 250);
        return;
      }
      let activeFx = battleFx.current;
      activeFx.shake = Math.max(0, activeFx.shake - 22 * N);
      activeFx.flash = Math.max(0, activeFx.flash - 1.9 * N);
      r.style.transform = activeFx.shake
        ? `translate3d(${(Math.random() - 0.5) * activeFx.shake}px, ${(Math.random() - 0.5) * activeFx.shake}px, 0)`
        : "translate3d(0,0,0)";
      if (
        "battle" === p.current &&
        "playing" === g.current &&
        0 === suspensions.current.size
      ) {
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
        for (let base of n.current) {
          let construction = base.construction;
          if (!construction) continue;
          if (construction.owner !== base.owner) {
            base.construction = null;
            continue;
          }
          if (T.current >= construction.finishAt) {
            let choice = developmentById[construction.optionId];
            if (choice?.kind) base.kind = choice.kind;
            else if (choice) base.specialization = choice.id;
            base.construction = null;
            f.current.push({
              id: C.current++,
              x: base.x,
              y: base.y,
              color: l[base.owner].main,
              text: "ACHEVÉ",
              age: 0,
            });
            impactFeedback(base.x, base.y, l[base.owner].main, 0.7);
            if (base.owner === "humans") {
              immersiveSound("repair");
              et(`${choice?.label || "Bâtiment"} achevé`);
            }
          }
        }
        for (let e of n.current)
          "neutral" === e.owner ||
            e.invulnerable ||
            (e.units = Math.min(
              "boss" === e.special ? 199 : 99,
              e.units +
                N *
                  getBaseStats(e).production *
                  (e.construction ? 0.55 : 1) *
                  ("orcs" === e.owner &&
                  "boss" === L.mode &&
                  "boss" === e.special &&
                  "orcs" === n.current[L.specialIds?.[2]]?.owner
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
            "orcs" === e.owner && (P.orcScore += N));
        }
        if ("escort" === L.mode && L.path) {
          let securedRoute = L.path
              .slice(0, P.caravanIndex + 1)
              .every((baseId) => "humans" === n.current[baseId]?.owner),
            nextRelay = L.path[P.caravanIndex + 1];
          if (!securedRoute) {
            P.caravanProgress = Math.max(0, P.caravanProgress - 0.22 * N);
            P.caravanHealth = Math.max(0, P.caravanHealth - 9 * N);
            P.caravanRouteBrokenEver = !0;
          } else {
            P.caravanHealth = Math.min(100, P.caravanHealth + 1.4 * N);
            void 0 !== nextRelay &&
              "humans" === n.current[nextRelay]?.owner &&
              ((P.caravanProgress += 0.16 * N),
              P.caravanProgress >= 1 &&
                (P.caravanIndex++,
                (P.caravanProgress = 0),
                et("Le convoi atteint un relais")));
          }
        }
        if (
          "boss" === L.mode &&
          !P.bossOpened &&
          L.specialIds?.every(
            (baseId) => "orcs" !== n.current[baseId]?.owner,
          )
        ) {
          ((P.bossOpened = !0),
            immersiveSound("magic"),
            (battleFx.current.flash = 0.45),
            et("Les trois runes sont brisées · Le bastion est vulnérable"));
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
          let humanBases = n.current
              .filter((e) => "humans" === e.owner)
              .sort((e, r) => r.units - e.units),
            e = humanBases.find((base) => 0 !== base.id),
            wasHuman = Boolean(e),
            joinedExistingOrcs = !1;
          if (!e) {
            e = n.current
              .filter(
                (base) =>
                  base.owner === "neutral" &&
                  base.id !== 0 &&
                  !base.invulnerable &&
                  !base.special,
              )
              .sort((left, right) => right.units - left.units)[0];
            if (!e) {
              e = n.current
                .filter((base) => base.owner === "orcs" && !base.invulnerable)
                .sort((left, right) => right.units - left.units)[0];
              joinedExistingOrcs = Boolean(e);
            }
          }
          ((P.betrayalDone = !0),
            (P.betrayedBaseId = e?.id ?? null),
            e &&
              ((e.owner = "orcs"),
              (e.construction = null),
              (e.units = joinedExistingOrcs
                ? Math.min(99, e.units + 16)
                : Math.max(16, e.units)),
              wasHuman && (P.lostHumanBase = !0),
              immersiveSound("betrayal"),
              impactFeedback(e.x, e.y, l.orcs.main, 1.5),
              navigator.vibrate?.([70, 35, 100]),
              et(
                joinedExistingOrcs
                  ? "Trahison ! Des renforts rejoignent la Horde"
                  : wasHuman
                    ? "Trahison ! Une garnison se retourne"
                    : "Trahison ! Une garnison cachée se révèle",
              )));
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
              ? (() => {
                let humanAnchor =
                  n.current.find(
                    (base) => base.id === 0 && base.owner === "humans",
                  ) || n.current.find((base) => base.owner === "humans");
                P.dawnReinforcement = "humans";
                addReinforcements(
                  n.current,
                  "humans",
                  80,
                  humanAnchor?.id,
                );
                immersiveSound("magic"),
                impactFeedback(
                  humanAnchor?.x || 0.06,
                  humanAnchor?.y || 0.5,
                  l.humans.main,
                  1.4,
                ),
                et("L’Armée de l’Aube est arrivée !");
              })()
              : (() => {
                let orcAnchor =
                  n.current.find(
                    (base) => base.id === 1 && base.owner === "orcs",
                  ) || n.current.find((base) => base.owner === "orcs");
                if (!orcAnchor) {
                  orcAnchor = n.current[1];
                  let previousOwner = orcAnchor.owner;
                  orcAnchor.owner = "orcs";
                  orcAnchor.construction = null;
                  orcAnchor.units = 1;
                  previousOwner === "humans" && (P.lostHumanBase = !0);
                }
                P.dawnReinforcement = "orcs";
                addReinforcements(n.current, "orcs", 90, orcAnchor.id);
                immersiveSound("wave"),
                impactFeedback(orcAnchor.x, orcAnchor.y, l.orcs.main, 1.5),
                et("La Horde déferle !");
              })()),
          "defense" === L.mode && T.current >= P.nextWave)
        ) {
          let waveIntervals = [8, 7, 10],
            waveUnits = [9, 14, 11],
            waveRatios = [0.34, 0.56, 0.44],
            waveIndex = P.waveCount % waveIntervals.length;
          P.waveCount++;
          P.nextWave += waveIntervals[waveIndex];
          for (let e of (
          n.current.filter((e) => "source" === e.special))) {
            e.units += waveUnits[waveIndex];
            let r = L.roads
              .filter(([r, t]) => r === e.id || t === e.id)
              .map(([r, t]) => (r === e.id ? t : r));
            r.length &&
              ei(
                e.id,
                r[(P.waveCount + e.id) % r.length],
                "orcs",
                waveRatios[waveIndex],
              );
          }
          (immersiveSound("wave"), navigator.vibrate?.([45, 25, 45]));
            et(
              waveIndex === 1
                ? "Une vague massive approche"
                : waveIndex === 2
                  ? "La Horde change d’axe"
                  : "Une nouvelle vague approche",
            );
        }
        let mind = orcMind.current;
        if (L.id >= 2 && T.current >= mind.nextBuildAt) {
          let buildCandidates = n.current
            .filter(
              (base) =>
                base.owner === "orcs" &&
                getDevelopmentChoices(base, L.id).length > 0,
            )
            .map((base) => {
              let neighborIds = L.roads
                  .filter(([from, to]) => from === base.id || to === base.id)
                  .map(([from, to]) => (from === base.id ? to : from)),
                onFront = neighborIds.some(
                  (id) => n.current[id]?.owner === "humans",
                ),
                preferredChoiceId =
                  base.kind === "city"
                    ? onFront
                      ? "raise-fortress"
                      : neighborIds.length >= 3
                        ? "raise-tower"
                        : "raise-village"
                    : base.kind === "village"
                      ? onFront
                        ? "walled-borough"
                        : "granary"
                      : base.kind === "fortress"
                        ? onFront
                          ? "citadel"
                          : "bastide"
                        : onFront
                          ? "watchtower"
                          : "royal-relay",
                options = getDevelopmentChoices(base, L.id),
                choice =
                  options.find((option) => option.id === preferredChoiceId) ||
                  options[0],
                incomingThreat = d.current
                  .filter(
                    (army) =>
                      army.owner === "humans" && army.to === base.id,
                  )
                  .reduce((total, army) => total + army.units, 0);
              return {
                base,
                choice,
                incomingThreat,
                score: base.units + (onFront ? 8 : 0) - 1.6 * incomingThreat,
              };
            })
            .filter(
              ({ base, choice, incomingThreat }) =>
                incomingThreat < 6 && base.units >= (choice?.cost || 99) + 6,
            )
            .sort((left, right) => right.score - left.score);
          let project = buildCandidates[0];
          if (
            project &&
            startDevelopment(project.base.id, project.choice.id, "orcs")
          ) {
            et(`La Horde bâtit : ${project.choice.label}`);
          }
          mind.nextBuildAt = T.current + 11 + 4 * Math.random();
        }
        let thinkDelay = L.id <= 2 ? 4.4 : L.id <= 5 ? 3.4 : 2.65,
          tutorialReleased =
            L.id > 4 || d.current.some((e) => "humans" === e.owner);
        if (mind.plan && T.current >= mind.plan.executeAt) {
          let launched = 0;
          for (let order of mind.plan.orders) {
            let source = n.current[order.from],
              target = n.current[order.to];
            source?.owner === "orcs" &&
              target &&
              ei(order.from, order.to, "orcs", order.ratio) &&
              launched++;
          }
          launched &&
            mind.plan.kind === "assault" &&
            immersiveSound("wave");
          ((mind.plan = null),
            (mind.nextThinkAt = T.current + thinkDelay));
        } else if (
          !mind.plan &&
          tutorialReleased &&
          T.current >= mind.nextThinkAt
        ) {
          let neighbors = (baseId) =>
              L.roads
                .filter(([from, to]) => from === baseId || to === baseId)
                .map(([from, to]) => (from === baseId ? to : from))
                .filter((targetId) => en(baseId, targetId)),
            sources = n.current.filter(
              (base) =>
                base.owner === "orcs" &&
                !base.invulnerable &&
                base.units >= (L.id <= 2 ? 16 : 12),
            ),
            assaultGroups = new Map();
          for (let source of sources)
            for (let targetId of neighbors(source.id)) {
              let target = n.current[targetId];
              if (!target || target.owner !== "humans" || target.invulnerable)
                continue;
              let ratio = source.units > 46 ? 0.62 : 0.52,
                group = assaultGroups.get(target.id) || {
                  target,
                  orders: [],
                  attack: 0,
                };
              (group.orders.push({
                from: source.id,
                to: target.id,
                ratio,
              }),
                (group.attack += Math.floor(source.units * ratio)),
                assaultGroups.set(target.id, group));
            }
          let assaults = [...assaultGroups.values()]
              .map((group) => {
                let incoming = d.current
                    .filter(
                      (army) =>
                        army.owner === "orcs" && army.to === group.target.id,
                    )
                    .reduce((sum, army) => sum + army.units, 0),
                  defense = group.target.units * getBaseStats(group.target).defense,
                  threshold = L.id <= 5 ? 0.96 : 0.76;
                return {
                  ...group,
                  viable:
                    group.attack + incoming >= defense * threshold ||
                    group.target.units <= 8,
                  score:
                    group.attack - defense +
                    9 * group.orders.length +
                    (group.target.kind === "fortress" ? 8 : 0) +
                    getMissionObjectivePriority(L, group.target, P) +
                    (commandPower.current.buffBaseId === group.target.id &&
                    T.current < commandPower.current.buffUntil
                      ? 18
                      : 0) -
                    0.7 * incoming,
                };
              })
              .filter((group) => group.viable)
              .sort((left, right) => right.score - left.score),
            plan = assaults[0]
              ? {
                  kind: "assault",
                  targetId: assaults[0].target.id,
                  orders: assaults[0].orders,
                  executeAt: T.current + (L.id <= 5 ? 2.7 : 2.15),
                }
              : null;
          if (!plan) {
            let reinforcements = [];
            for (let front of sources) {
              let frontNeighbors = neighbors(front.id).map(
                (targetId) => n.current[targetId],
              );
              if (!frontNeighbors.some((base) => base?.owner === "humans"))
                continue;
              for (let donor of frontNeighbors.filter(
                (base) =>
                  base?.owner === "orcs" &&
                  base.id !== front.id &&
                  base.units >= 18 &&
                  base.units > front.units + 7,
              ))
                reinforcements.push({
                  donor,
                  front,
                  score: donor.units - front.units + (front.units < 18 ? 16 : 0),
                });
            }
            reinforcements.sort((left, right) => right.score - left.score);
            let reinforcement = reinforcements[0];
            reinforcement &&
              (plan = {
                kind: "reinforce",
                targetId: reinforcement.front.id,
                orders: [
                  {
                    from: reinforcement.donor.id,
                    to: reinforcement.front.id,
                    ratio: 0.4,
                  },
                ],
                executeAt: T.current + 1.7,
              });
          }
          if (!plan) {
            let expansions = [];
            for (let source of sources)
              for (let targetId of neighbors(source.id)) {
                let target = n.current[targetId];
                if (!target || target.owner !== "neutral") continue;
                let attack = Math.floor(source.units * 0.52),
                  defense = target.units * getBaseStats(target).defense;
                attack >= 0.82 * defense &&
                  expansions.push({
                    source,
                    target,
                    score:
                      attack - defense +
                      getMissionObjectivePriority(L, target, P) +
                      (target.kind === "village" ? 5 : 0),
                  });
              }
            expansions.sort((left, right) => right.score - left.score);
            let expansion = expansions[0];
            expansion &&
              (plan = {
                kind: "expand",
                targetId: expansion.target.id,
                orders: [
                  {
                    from: expansion.source.id,
                    to: expansion.target.id,
                    ratio: 0.52,
                  },
                ],
                executeAt: T.current + 1.85,
              });
          }
          if (plan) {
            let target = n.current[plan.targetId];
            ((mind.plan = plan),
              f.current.push({
                id: C.current++,
                x: target.x,
                y: target.y,
                color: l.orcs.main,
                text:
                  plan.kind === "assault"
                    ? "ASSAUT"
                    : plan.kind === "reinforce"
                      ? "RENFORTS"
                      : "AVANCÉE",
                age: 0,
              }));
            if (plan.kind === "assault") {
              (et(
                plan.orders.length > 1
                  ? "La Horde lance un assaut coordonné !"
                  : "La Horde prépare un assaut !",
              ),
                navigator.vibrate?.([18, 28, 18]));
            } else if (plan.kind === "reinforce")
              et("La Horde rassemble ses forces");
            else L.id >= 5 && et("Les éclaireurs orcs avancent");
          } else mind.nextThinkAt = T.current + 1.15;
        }
        m.current = m.current.filter(
          (route) =>
            n.current[route.from]?.owner === route.owner &&
            n.current[route.to]?.owner === route.owner,
        );
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
              impactFeedback(t.x, t.y, l.humans.main, 0.7));
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
            let e = getBaseStats(t).defense;
            "boss" === L.mode &&
              "boss" === t.special &&
              "orcs" === n.current[L.specialIds?.[1]]?.owner &&
              (e += 0.45);
            let s = r.units / e,
              bossProtected =
                "boss" === L.mode &&
                "boss" === t.special &&
                "orcs" === t.owner &&
                L.specialIds?.some(
                  (baseId) => "orcs" === n.current[baseId]?.owner,
                );
            s > t.units
              ? bossProtected
                ? ((t.units = 1),
                  "humans" === r.owner &&
                    et("Les runes maintiennent le bastion debout"))
                : ((t.owner = r.owner),
                  (t.construction = null),
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
              1 === L.id && 3 === t.id && X(2)),
            e.add(r.id));
        }
        for (let r of ((d.current = d.current.filter((r) => !e.has(r.id))),
        f.current))
          r.age += N;
        f.current = f.current.filter((e) => e.age < 0.9);
        let missionOutcome = evaluateMissionOutcome({
          mission: L,
          runtime: P,
          bases: n.current,
          armies: d.current,
          elapsed: T.current,
        });
        missionOutcome && ea(missionOutcome);
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
      let missionMap = missionMapArt.current[L.id];
      if (missionMap?.complete && missionMap.naturalWidth) {
        let scale = Math.max(
            o / missionMap.naturalWidth,
            c / missionMap.naturalHeight,
          ),
          sourceWidth = o / scale,
          sourceHeight = c / scale,
          sourceX = (missionMap.naturalWidth - sourceWidth) / 2,
          sourceY = (missionMap.naturalHeight - sourceHeight) / 2;
        (t.drawImage(
          missionMap,
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
        let terrainColors =
          missionVisuals[L.id]?.palette || ["#294c31", "#193523", "#34291b"],
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
      if (!missionMap?.complete) drawMissionLandmarks(t, o, c, L);
      let E = (e) => battlefield.left + e.x * b,
        I = (e) => battlefield.top + e.y * M;
      for (let [e, r] of L.roads) {
        let s = n.current[e],
          a = n.current[r],
          l =
            L.lockedRoad &&
            P.bridge < (L.target || 40) &&
            ((e === L.lockedRoad[0] && r === L.lockedRoad[1]) ||
              (r === L.lockedRoad[0] && e === L.lockedRoad[1])),
          fromX = E(s),
          fromY = I(s),
          toX = E(a),
          toY = I(a),
          angle = Math.atan2(toY - fromY, toX - fromX),
          inset = 29,
          startX = fromX + Math.cos(angle) * inset,
          startY = fromY + Math.sin(angle) * inset,
          endX = toX - Math.cos(angle) * inset,
          endY = toY - Math.sin(angle) * inset,
          curve = (((17 * e + 31 * r) % 3) - 1) * 7,
          controlX = (startX + endX) / 2 - Math.sin(angle) * curve,
          controlY = (startY + endY) / 2 + Math.cos(angle) * curve,
          roadPath = () => {
            (t.beginPath(),
              t.moveTo(startX, startY),
              t.quadraticCurveTo(controlX, controlY, endX, endY));
          };
        (t.save(),
          (t.lineCap = "round"),
          (t.lineJoin = "round"),
          roadPath(),
          (t.strokeStyle = l ? "rgba(67,16,13,.74)" : "rgba(26,20,14,.42)"),
          (t.lineWidth = l ? 8 : 10),
          t.stroke(),
          roadPath(),
          (t.strokeStyle = l
            ? "rgba(255,111,91,.68)"
            : "rgba(130,107,70,.42)"),
          (t.lineWidth = l ? 3 : 5),
          t.setLineDash(l ? [5, 8] : []),
          t.stroke(),
          t.setLineDash([]),
          !l &&
            (roadPath(),
            (t.strokeStyle = "rgba(232,211,164,.28)"),
            (t.lineWidth = 1),
            t.stroke()),
          t.restore());
      }
      let pendingOrcPlan = orcMind.current.plan;
      if (pendingOrcPlan) {
        let pulse = 0.62 + 0.22 * Math.sin(0.012 * performance.now()),
          intentColor =
            pendingOrcPlan.kind === "assault" ? "#ff735f" : "#f3a45f";
        for (let order of pendingOrcPlan.orders) {
          if ("fog" === L.mode && !eo(order.to)) continue;
          let source = n.current[order.from],
            target = n.current[order.to];
          if (!source || !target) continue;
          let fromX = E(source),
            fromY = I(source),
            toX = E(target),
            toY = I(target),
            angle = Math.atan2(toY - fromY, toX - fromX),
            arrowX = toX - 27 * Math.cos(angle),
            arrowY = toY - 27 * Math.sin(angle);
          (t.save(),
            (t.globalAlpha = pulse),
            (t.strokeStyle = intentColor),
            (t.shadowColor = l.orcs.glow),
            (t.shadowBlur = 10),
            (t.lineWidth = pendingOrcPlan.kind === "assault" ? 4 : 3),
            t.setLineDash([7, 8]),
            (t.lineDashOffset = -0.02 * performance.now()),
            t.beginPath(),
            t.moveTo(fromX, fromY),
            t.lineTo(arrowX, arrowY),
            t.stroke(),
            t.setLineDash([]),
            (t.fillStyle = intentColor),
            t.beginPath(),
            t.moveTo(arrowX, arrowY),
            t.lineTo(
              arrowX - 13 * Math.cos(angle - 0.55),
              arrowY - 13 * Math.sin(angle - 0.55),
            ),
            t.lineTo(
              arrowX - 13 * Math.cos(angle + 0.55),
              arrowY - 13 * Math.sin(angle + 0.55),
            ),
            t.closePath(),
            t.fill(),
            t.restore());
        }
        let target = n.current[pendingOrcPlan.targetId];
        if (target && ("fog" !== L.mode || eo(target.id)))
          (t.save(),
            (t.globalAlpha = pulse),
            (t.strokeStyle = intentColor),
            (t.lineWidth = 3),
            (t.shadowColor = l.orcs.glow),
            (t.shadowBlur = 14),
            t.beginPath(),
            t.arc(E(target), I(target), 31 + 4 * pulse, 0, 7),
            t.stroke(),
            t.restore());
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
            ("fortress" === e.kind
              ? 27
              : "tower" === e.kind
                ? 22
                : "city" === e.kind
                  ? 20
                  : 24) *
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
        let factionArt =
            "orcs" === e.owner
              ? buildingArt.current.orcs
              : "humans" === e.owner
                ? buildingArt.current.humans
                : buildingArt.current.neutral,
          buildingSprite = factionArt[e.kind] || factionArt.city;
        if (buildingSprite?.complete && buildingSprite.naturalWidth) {
          let scale = Math.max(0.74, Math.min(1.03, c / 455)),
            targetWidths = { city: 78, village: 82, fortress: 92, tower: 64 },
            maxHeights = { city: 64, village: 67, fortress: 79, tower: 88 },
            spriteWidth = (targetWidths[e.kind] || 78) * scale,
            spriteHeight =
              spriteWidth *
              (buildingSprite.naturalHeight / buildingSprite.naturalWidth),
            maxHeight = (maxHeights[e.kind] || 67) * scale;
          if (spriteHeight > maxHeight) {
            spriteWidth *= maxHeight / spriteHeight;
            spriteHeight = maxHeight;
          }
          let baseY = n + 19 * scale,
            spriteTop = baseY - spriteHeight,
            badgeY = baseY - 4,
            haloPulse = 1 + 0.05 * Math.sin(0.006 * performance.now()),
            needsFocus = o || u || isPowerTarget || isBannered;
          (t.save(),
            (t.shadowColor = "rgba(0,0,0,.72)"),
            (t.shadowBlur = 11),
            (t.fillStyle = "rgba(2,5,4,.48)"),
            t.beginPath(),
            t.ellipse(
              r,
              baseY - 6,
              0.46 * spriteWidth,
              Math.max(7, 0.11 * spriteHeight),
              0,
              0,
              7,
            ),
            t.fill(),
            (t.shadowBlur = 0),
            (t.globalAlpha = "neutral" === e.owner ? 0.08 : 0.14),
            (t.fillStyle = i.main),
            t.beginPath(),
            t.ellipse(
              r,
              baseY - 7,
              0.48 * spriteWidth,
              Math.max(8, 0.13 * spriteHeight),
              0,
              0,
              7,
            ),
            t.fill(),
            (t.globalAlpha = 1),
            needsFocus &&
              ((t.strokeStyle = u || isPowerTarget ? "#fff4d0" : i.main),
              (t.lineWidth = u || isPowerTarget ? 3 : 2),
              (t.shadowColor = i.glow),
              (t.shadowBlur = 16),
              t.beginPath(),
              t.ellipse(
                r,
                baseY - 7,
                0.49 * spriteWidth * haloPulse,
                Math.max(11, 0.16 * spriteHeight) * haloPulse,
                0,
                0,
                7,
              ),
              t.stroke(),
              (t.shadowBlur = 0)),
            (t.filter =
              "neutral" === e.owner
                ? "grayscale(.72) saturate(.48) brightness(.84) contrast(.92)"
                : "orcs" === e.owner
                  ? "saturate(.82) brightness(.86) contrast(.95)"
                  : "saturate(.78) brightness(.9) contrast(.94)"),
            t.drawImage(
              buildingSprite,
              r - spriteWidth / 2,
              spriteTop,
              spriteWidth,
              spriteHeight,
            ),
            (t.filter = "none"),
            e.construction &&
              ((t.strokeStyle = "#fff0a8"),
              (t.lineWidth = 3),
              t.beginPath(),
              t.arc(
                r,
                n,
                0.48 * spriteWidth,
                -Math.PI / 2,
                -Math.PI / 2 +
                  Math.PI *
                    2 *
                    Math.min(
                      1,
                      (T.current - e.construction.startedAt) /
                        (e.construction.finishAt - e.construction.startedAt),
                    ),
              ),
              t.stroke()),
            t.beginPath(),
            t.roundRect(r - 17, badgeY - 9, 34, 18, 9),
            (t.fillStyle = "rgba(4,8,6,.96)"),
            t.fill(),
            (t.strokeStyle = "neutral" === e.owner ? "#a8a79b" : i.main),
            (t.lineWidth = 1.25),
            t.stroke(),
            (t.fillStyle = "#fff8e8"),
            (t.font = "900 11px var(--font-geist)"),
            (t.textAlign = "center"),
            t.fillText(String(Math.floor(e.units)), r, badgeY + 3.5));
          if (e.special) {
            let specialLabels = {
              source: "∞ SOURCE",
              seal: "RUNE",
              boss: "BOSS",
              exit: "SORTIE",
              worksite: "PONT",
              relic: "COURONNE",
            },
              label = specialLabels[e.special];
            ((t.font = "900 8px var(--font-geist)"),
              (t.textAlign = "center"),
              (t.fillStyle = "rgba(4,8,6,.82)"),
              t.beginPath(),
              t.roundRect(r - 27, spriteTop - 9, 54, 14, 7),
              t.fill(),
              (t.fillStyle = "boss" === e.special ? "#ff846f" : "#f5d77f"),
              t.fillText(label, r, spriteTop + 1));
          }
          if (e.specialization && !e.construction) {
            ((t.fillStyle = "#fff0a8"),
              (t.font = "900 12px var(--font-geist)"),
              t.fillText(
                developmentById[e.specialization]?.icon || "✦",
                r + 0.42 * spriteWidth,
                spriteTop + 8,
              ));
          }
          if (isBannered) {
            ((t.fillStyle = "#fff0a8"),
              (t.shadowColor = l.humans.glow),
              (t.shadowBlur = 12),
              (t.font = "900 17px var(--font-geist)"),
              t.fillText("♛", r, spriteTop - (e.special ? 15 : 3)),
              (t.shadowBlur = 0));
          }
          t.restore();
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
          "city" === e.kind
            ? ((t.fillStyle = i.dark),
              t.fillRect(r - 0.7 * a, n - 0.08 * a, 0.56 * a, 0.52 * a),
              t.fillRect(r + 0.12 * a, n - 0.24 * a, 0.58 * a, 0.68 * a),
              (t.fillStyle = i.main),
              t.beginPath(),
              t.moveTo(r - 0.78 * a, n - 0.08 * a),
              t.lineTo(r - 0.42 * a, n - 0.55 * a),
              t.lineTo(r - 0.06 * a, n - 0.08 * a),
              t.fill(),
              t.beginPath(),
              t.moveTo(r + 0.04 * a, n - 0.24 * a),
              t.lineTo(r + 0.41 * a, n - 0.75 * a),
              t.lineTo(r + 0.78 * a, n - 0.24 * a),
              t.fill())
            : ((t.fillStyle = i.dark),
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
                t.fill())),
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
          e.construction &&
            ((t.strokeStyle = "#fff0a8"),
            (t.lineWidth = 3),
            t.beginPath(),
            t.arc(
              r,
              n,
              a + 15,
              -Math.PI / 2,
              -Math.PI / 2 +
                Math.PI *
                  2 *
                  Math.min(
                    1,
                    (T.current - e.construction.startedAt) /
                      (e.construction.finishAt - e.construction.startedAt),
                  ),
            ),
            t.stroke(),
            (t.fillStyle = "#fff0a8"),
            (t.font = "900 13px var(--font-geist)"),
            t.fillText("⚒", r, n - a - 12)),
          e.specialization &&
            !e.construction &&
            ((t.fillStyle = "#fff0a8"),
            (t.font = "900 12px var(--font-geist)"),
            t.fillText(
              developmentById[e.specialization]?.icon || "✦",
              r,
              n - a - 12,
            )),
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
          n = E({ x: e.x + (e.vx || 0) * e.age }),
          s = I({
            y:
              e.y +
              (e.vy || 0) * e.age +
              (e.kind === "spark" ? 0.09 * e.age * e.age : 0),
          });
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
        (cancelAnimationFrame(s), window.clearTimeout(pauseTimer), o.disconnect());
      }
    );
  }, [
    et,
    ea,
    ei,
    es,
    er,
    gainCommand,
    immersiveSound,
    E,
    P,
    startDevelopment,
    V,
  ]);
  let eu = (e) => {
      let r = e.currentTarget.getBoundingClientRect();
      return {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        w: r.width,
        h: r.height,
      };
    },
    ec = (e, r, t, s) => {
      let battlefield = getBattlefieldLayout(t, s);
      return n.current
        .map((base) => ({
          base,
          distance: Math.hypot(
            battlefield.left + base.x * battlefield.width - e,
            battlefield.top + base.y * battlefield.height - r,
          ),
        }))
        .filter(({ distance }) => distance < 52)
        .sort((left, right) => left.distance - right.distance)[0]?.base;
    },
    ed = (e) => {
      let r = x.current,
        t = w.current;
      if (
        ((x.current = null),
        (w.current = null),
        (j.current = null),
        null !== r && null !== t)
      ) {
        if (r === t) {
          let base = n.current[r];
          h.current.id >= 2 &&
            base?.owner === "humans" &&
            !base.special &&
            !base.invulnerable &&
            (base.construction ||
              base.specialization ||
              getDevelopmentChoices(base, h.current.id).length > 0) &&
            setBuildMenu(r);
          e.currentTarget.releasePointerCapture?.(e.pointerId);
          return;
        }
        setBuildMenu(null);
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
    eh = c[O]?.[Q],
    buildBase = null === buildMenu ? null : n.current[buildMenu],
    buildOptions =
      buildBase?.owner === "humans"
        ? getDevelopmentChoices(buildBase, O)
        : [],
    activeSpecialization = buildBase?.specialization
      ? developmentById[buildBase.specialization]
      : null,
    totalCrowns = Object.values(_.crowns).reduce(
      (total, crowns) => total + countCrowns(crowns),
      0,
    ),
    campaignActs = [
      { id: "I", title: "Les armes du royaume", missions: s.slice(0, 5) },
      { id: "II", title: "La Horde déferle", missions: s.slice(5, 10) },
      { id: "III", title: "La guerre des couronnes", missions: s.slice(10, 15) },
    ],
    formatTime = (e) =>
      `${Math.floor(e / 60)}:${String(e % 60).padStart(2, "0")}`,
    launchMission = (e) => {
      setSelectedMission(null);
      e.id >= 6 ? setMissionIntro(e) : el(e.id);
    };
  return (0, r.jsxs)("main", {
    className: `game-shell screen-${P}`,
    children: [
      (0, r.jsxs)("header", {
        className: "topbar",
        children: [
          (0, r.jsxs)("button", {
            className: "brand",
            onClick: () => {
              (A("home"), setMissionIntro(null), setSelectedMission(null));
            },
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
              "battle" === P &&
                (0, r.jsx)("time", { children: formatTime(Y.time) }),
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
                "aria-label": H ? "Réactiver le son" : "Couper le son",
                "aria-pressed": H,
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
              t || setBuildMenu(null);
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
                (w.current = t.id),
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
            onPointerCancel: () => {
              ((x.current = null),
                (w.current = null),
                (j.current = null));
            },
          }),
          "home" === P &&
            (0, r.jsxs)("div", {
              className: "home-screen",
              children: [
                (0, r.jsxs)("div", {
                  className: "home-sigils",
                  children: [
                    (0, r.jsx)("i", {}),
                    (0, r.jsx)("i", {}),
                    (0, r.jsx)("i", {}),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "home-hero",
                  children: [
                    (0, r.jsx)("div", {
                      className: "home-standard",
                      children: "♜",
                    }),
                    (0, r.jsx)("h1", { children: "Royaumes en Guerre" }),
                    (0, r.jsxs)("div", {
                      className: "home-progress",
                      children: [
                        (0, r.jsxs)("span", {
                          children: [
                            (0, r.jsx)("b", { children: `${_.unlocked}/15` }),
                            (0, r.jsx)("small", { children: "FRONTS OUVERTS" }),
                          ],
                        }),
                        (0, r.jsxs)("span", {
                          children: [
                            (0, r.jsx)("b", { children: totalCrowns }),
                            (0, r.jsx)("small", { children: "COURONNES" }),
                          ],
                        }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "home-actions",
                      children: [
                        (0, r.jsxs)("button", {
                          className: "primary-button home-continue",
                          onClick: () => openMission(_.unlocked),
                          children: [
                            (0, r.jsx)("span", {
                              children: _.unlocked > 1 ? "CONTINUER" : "COMMENCER",
                            }),
                            (0, r.jsx)("small", {
                              children: `Mission ${String(_.unlocked).padStart(2, "0")} · ${s[_.unlocked - 1].name}`,
                            }),
                          ],
                        }),
                        (0, r.jsx)("button", {
                          className: "secondary-button",
                          onClick: () => A("campaign"),
                          children: "Carte de campagne",
                        }),
                        (0, r.jsx)("button", {
                          className: "home-icon-button",
                          onClick: () => F((e) => !e),
                          "aria-label": H
                            ? "Réactiver le son"
                            : "Couper le son",
                          "aria-pressed": H,
                          children: H ? "SON COUPÉ" : "SON ACTIF",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          "campaign" === P &&
            (0, r.jsxs)("div", {
              className: "campaign-overlay",
              children: [
                (0, r.jsxs)("div", {
                  className: "campaign-head",
                  children: [
                    (0, r.jsx)("button", {
                      className: "campaign-back",
                      onClick: () => A("home"),
                      children: "‹ ACCUEIL",
                    }),
                    (0, r.jsxs)("div", {
                      children: [
                        (0, r.jsx)("h1", { children: "Carte de campagne" }),
                      ],
                    }),
                    (0, r.jsxs)("div", {
                      className: "campaign-tally",
                      children: [
                        (0, r.jsx)("b", { children: totalCrowns }),
                        (0, r.jsx)("span", { children: "♛ SUR 45" }),
                      ],
                    }),
                  ],
                }),
                (0, r.jsx)("div", {
                  className: "campaign-route",
                  children: campaignActs.map((e) =>
                    (0, r.jsxs)(
                      "section",
                      {
                        className: "campaign-act",
                        children: [
                          (0, r.jsxs)("header", {
                            children: [
                              (0, r.jsx)("span", { children: `ACTE ${e.id}` }),
                              (0, r.jsx)("strong", { children: e.title }),
                            ],
                          }),
                          (0, r.jsx)("div", {
                            className: "mission-track",
                            children: e.missions.map((e) => {
                              let t = e.id > _.unlocked,
                                n = countCrowns(_.crowns[e.id]);
                              return (0, r.jsxs)(
                                "button",
                                {
                                  disabled: t,
                                  className: `mission-node ${t ? "locked" : ""} ${e.id === _.unlocked ? "current" : ""} ${n ? "complete" : ""}`,
                                  onClick: () => setSelectedMission(e),
                                  children: [
                                    (0, r.jsx)("span", {
                                      className: "node-medallion",
                                      children: t
                                        ? "◆"
                                        : String(e.id).padStart(2, "0"),
                                    }),
                                    (0, r.jsx)("strong", { children: e.name }),
                                    (0, r.jsx)("em", {
                                      children: t
                                        ? "VERROUILLÉE"
                                        : `${"♛".repeat(n)}${"·".repeat(3 - n)}`,
                                    }),
                                  ],
                                },
                                e.id,
                              );
                            }),
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                }),
              ],
            }),
          selectedMission &&
            (0, r.jsx)("div", {
              className: `mission-sheet terrain-${selectedMission.terrain}`,
              children: (0, r.jsxs)("div", {
                className: "mission-sheet-card",
                children: [
                  (0, r.jsx)("button", {
                    className: "sheet-close",
                    onClick: () => setSelectedMission(null),
                    "aria-label": "Fermer",
                    children: "×",
                  }),
                  (0, r.jsxs)("div", {
                    className: "sheet-identity",
                    children: [
                      (0, r.jsx)("span", {
                        className: "sheet-number",
                        children: String(selectedMission.id).padStart(2, "0"),
                      }),
                      (0, r.jsx)("small", { children: selectedMission.region }),
                      (0, r.jsx)("h2", { children: selectedMission.name }),
                    ],
                  }),
                  (0, r.jsxs)("div", {
                    className: "sheet-orders",
                    children: [
                      (0, r.jsx)("h3", { children: selectedMission.objective }),
                      (0, r.jsxs)("div", {
                        className: "crown-conditions",
                        children: getCrownDefinitions(selectedMission).map((e) =>
                          (0, r.jsxs)(
                            "span",
                            {
                              className:
                                _.crowns[selectedMission.id]?.[e.id]
                                  ? "earned"
                                  : "",
                              children: [
                                (0, r.jsx)("b", { children: "♛" }),
                                e.label,
                              ],
                            },
                            e.id,
                          ),
                        ),
                      }),
                      (0, r.jsx)("button", {
                        className: "primary-button",
                        onClick: () => launchMission(selectedMission),
                        children:
                          countCrowns(_.crowns[selectedMission.id]) > 0
                            ? "Rejouer cette mission"
                            : "Partir au combat",
                      }),
                    ],
                  }),
                ],
              }),
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
                        (0, r.jsx)("span", { children: "⚒" }),
                        (0, r.jsxs)("p", {
                          children: [
                            (0, r.jsx)("small", {
                              children: "NOUVELLES MÉCANIQUES",
                            }),
                            (0, r.jsx)("b", {
                              children: "Spécialisations & Bannière",
                            }),
                            "Tes bâtiments peuvent maintenant se spécialiser. La Bannière rallie aussi les garnisons quand sa jauge est pleine.",
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
                buildBase?.owner === "humans" &&
                  (0, r.jsxs)("div", {
                    className: "development-panel",
                    children: [
                      (0, r.jsxs)("header", {
                        children: [
                          (0, r.jsxs)("span", {
                            children: [
                              (0, r.jsx)("small", {
                                children: "DÉVELOPPEMENT DU TERRITOIRE",
                              }),
                              (0, r.jsx)("strong", {
                                children:
                                  activeSpecialization?.label ||
                                  buildingNames[buildBase.kind],
                              }),
                            ],
                          }),
                          (0, r.jsx)("button", {
                            className: "development-close",
                            onClick: () => setBuildMenu(null),
                            "aria-label": "Fermer",
                            children: "×",
                          }),
                        ],
                      }),
                      buildBase.construction
                        ? (0, r.jsxs)("div", {
                            className: "construction-progress",
                            children: [
                              (0, r.jsx)("b", {
                                children: `⚒ ${developmentById[buildBase.construction.optionId]?.label || "Chantier"}`,
                              }),
                              (0, r.jsx)("span", {
                                children: `${Math.max(0, Math.ceil(buildBase.construction.finishAt - Y.time))} s`,
                              }),
                              (0, r.jsx)("i", {
                                children: (0, r.jsx)("em", {
                                  style: {
                                    width: `${Math.min(100, Math.max(0, ((Y.time - buildBase.construction.startedAt) / (buildBase.construction.finishAt - buildBase.construction.startedAt)) * 100))}%`,
                                  },
                                }),
                              }),
                            ],
                          })
                        : activeSpecialization
                          ? (0, r.jsxs)("div", {
                              className: "development-complete",
                              children: [
                                (0, r.jsx)("b", {
                                  children: `${activeSpecialization.icon} Spécialisation achevée`,
                                }),
                                (0, r.jsx)("span", {
                                  children: activeSpecialization.description,
                                }),
                              ],
                            })
                          : (0, r.jsx)("div", {
                              className: `development-options ${buildOptions.length === 3 ? "three" : ""}`,
                              children: buildOptions.map((option) =>
                                (0, r.jsxs)(
                                  "button",
                                  {
                                    disabled: buildBase.units < option.cost + 1,
                                    onClick: () =>
                                      startDevelopment(buildBase.id, option.id),
                                    children: [
                                      (0, r.jsx)("i", { children: option.icon }),
                                      (0, r.jsxs)("span", {
                                        children: [
                                          (0, r.jsx)("strong", {
                                            children: option.label,
                                          }),
                                          (0, r.jsx)("small", {
                                            children: option.description,
                                          }),
                                        ],
                                      }),
                                      (0, r.jsx)("em", {
                                        children: `−${option.cost}`,
                                      }),
                                    ],
                                  },
                                  option.id,
                                ),
                              ),
                            }),
                    ],
                  }),
                (0, r.jsxs)("div", {
                  className: "objective-chip",
                  children: [
                    (0, r.jsxs)("b", {
                      children: [
                        (0, r.jsx)("i", { children: "◆" }),
                        z,
                      ],
                    }),
                  ],
                }),
                (0, r.jsxs)("div", {
                  className: "dispatch-panel",
                  children: [
                    [0.25, 0.5, 1].map((e) =>
                      (0, r.jsx)(
                        "button",
                        {
                          className: D === e ? "active" : "",
                          onClick: () => U(e),
                          "aria-pressed": D === e,
                          children: 1 === e ? "TOUT" : 0.5 === e ? "½" : "¼",
                        },
                        e,
                      ),
                    ),
                    O >= 4 &&
                      (0, r.jsx)("button", {
                        className: `supply-toggle ${$ ? "active" : ""}`,
                        onClick: () => B((e) => !e),
                        "aria-label": "Ravitaillement automatique",
                        "aria-pressed": $,
                        title: "Ravitaillement automatique",
                        children: "↻",
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
                        "aria-pressed": commandUi.targeting,
                        disabled:
                          commandUi.charge < 100 && !commandUi.targeting,
                        "aria-label": "Bannière du Roi",
                        children: [
                          (0, r.jsx)("strong", { children: "♛" }),
                          (0, r.jsx)("small", {
                            children: commandUi.targeting
                              ? "ANNULER"
                              : "ACTIVER",
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
                        children: [
                          "LEÇON ",
                          O,
                          " · ",
                          Q + 1,
                          "/",
                          c[O]?.length || 1,
                        ],
                      }),
                      (0, r.jsx)("strong", { children: eh.title }),
                      (0, r.jsx)("p", { children: eh.text }),
                    ],
                  }),
                G &&
                  (0, r.jsx)("div", {
                    className: "action-toast",
                    role: "status",
                    "aria-live": "polite",
                    children: G,
                  }),
                "paused" === E &&
                  (0, r.jsx)("div", {
                    className: "modal-overlay",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Bataille en pause",
                    children: (0, r.jsxs)("div", {
                      children: [
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
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Résultat de la bataille",
                    children: (0, r.jsxs)("div", {
                      className: `result-panel ${E}`,
                      children: [
                        (0, r.jsx)("div", {
                          className: "result-seal",
                          children: "won" === E ? "♛" : "☠",
                        }),
                        (0, r.jsx)("h2", {
                          children:
                            "won" === E
                              ? ef.name
                              : "La ligne a cédé",
                        }),
                        (0, r.jsx)("div", {
                          className: "result-crowns",
                          children: getCrownDefinitions(ef).map((crown) =>
                            (0, r.jsxs)(
                              "span",
                              {
                                className:
                                  battleReport?.crowns?.[crown.id]
                                    ? "earned"
                                    : "",
                                children: [
                                  (0, r.jsx)("b", { children: "♛" }),
                                  (0, r.jsx)("small", {
                                    children: crown.shortLabel,
                                  }),
                                ],
                              },
                              crown.id,
                            ),
                          ),
                        }),
                        (0, r.jsxs)("div", {
                          className: "result-stats",
                          children: [
                            (0, r.jsxs)("span", {
                              children: [
                                (0, r.jsx)("small", { children: "DURÉE" }),
                                (0, r.jsx)("b", {
                                  children: formatTime(battleReport?.time || 0),
                                }),
                              ],
                            }),
                            (0, r.jsxs)("span", {
                              children: [
                                (0, r.jsx)("small", { children: "POSITIONS" }),
                                (0, r.jsx)("b", {
                                  children: battleReport?.bases || 0,
                                }),
                              ],
                            }),
                            (0, r.jsxs)("span", {
                              children: [
                                (0, r.jsx)("small", { children: "SOLDATS" }),
                                (0, r.jsx)("b", {
                                  children: battleReport?.troops || 0,
                                }),
                              ],
                            }),
                          ],
                        }),
                        "won" === E && O < 15 &&
                          (0, r.jsxs)("div", {
                            className: "unlock-banner",
                            children: [
                              (0, r.jsx)("span", { children: "NOUVEAU FRONT" }),
                              (0, r.jsx)("b", { children: s[O].name }),
                            ],
                          }),
                        (0, r.jsxs)("div", {
                          className: "result-actions",
                          children: [
                            (0, r.jsx)("button", {
                              className: "primary-button",
                              onClick: () =>
                                "won" === E && O < 15
                                  ? openMission(O + 1)
                                  : el(O),
                              children:
                                "won" === E && O < 15
                                  ? "Préparer la mission suivante"
                                  : "Rejouer",
                            }),
                            (0, r.jsx)("button", {
                              className: "secondary-button",
                              onClick: () => A("campaign"),
                              children: "Carte de campagne",
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
              ],
            }),
          V &&
            (0, r.jsx)("div", {
              className: "modal-overlay codex",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "Codex du commandant",
              children: (0, r.jsxs)("div", {
                children: [
                  (0, r.jsx)("button", {
                    className: "close",
                    onClick: () => W(!1),
                    "aria-label": "Fermer le Codex",
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
                          (0, r.jsx)("b", { children: "Ville niveau I" }),
                          "Dès la mission 2, la majorité des positions n’a aucun bonus. Le village se débloque en mission 2, la forteresse en mission 3 et la tour en mission 4.",
                        ],
                      }),
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
                      (0, r.jsxs)("p", {
                        children: [
                          (0, r.jsx)("b", {
                            children: "Spécialisations",
                          }),
                          "Dès la mission 6, chaque village, tour ou forteresse peut évoluer une seconde fois. Les chantiers coûtent des soldats et sont interrompus par une capture.",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
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
