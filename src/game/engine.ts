import {
  ACADEMY_CLUBS,
  ATTRIBUTE_WEIGHTS,
  RARITY_WEIGHTS,
  STARTING_PERCENT,
} from "./constants";
import { ATTACKERS } from "./players";
import {
  ATTRIBUTES,
  type AcquiredAttribute,
  type AttributeKey,
  type DraftState,
  type Identity,
  type Nationality,
  type Rarity,
  type SourcePlayer,
} from "./types";

const RARITIES: Rarity[] = [
  "legend",
  "epic",
  "rare",
  "uncommon",
  "common",
];

export function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomAcademy(nationality: Nationality): string {
  return randomItem(ACADEMY_CLUBS[nationality]);
}

function randomRarity(): Rarity {
  const roll = Math.random();
  let cumulative = 0;

  for (const rarity of RARITIES) {
    cumulative += RARITY_WEIGHTS[rarity];
    if (roll < cumulative) return rarity;
  }

  return "common";
}

export function drawPlayer(excludedIds: string[] = []): SourcePlayer {
  const available = ATTACKERS.filter((player) => !excludedIds.includes(player.id));
  const pool = available.length ? available : ATTACKERS;
  const rarity = randomRarity();
  const rarityPool = pool.filter((player) => player.rarity === rarity);
  return randomItem(rarityPool.length ? rarityPool : pool);
}

export function calculatePotential(sourceValue: number): number {
  let bonus: number;

  if (sourceValue <= 69) bonus = 12;
  else if (sourceValue <= 79) bonus = 10;
  else if (sourceValue <= 87) bonus = 8;
  else if (sourceValue <= 92) bonus = 5;
  else if (sourceValue <= 95) bonus = 3;
  else bonus = 2;

  return Math.min(99, sourceValue + bonus);
}

export function acquireAttribute(
  state: DraftState,
  key: AttributeKey,
  player: SourcePlayer,
): DraftState {
  if (state.acquired[key]) return state;

  const sourceValue = player.attributes[key];
  const acquired: AcquiredAttribute = {
    key,
    sourcePlayerId: player.id,
    sourcePlayerName: player.name,
    sourceValue,
    currentValue: Math.round(sourceValue * STARTING_PERCENT),
    potentialValue: calculatePotential(sourceValue),
  };

  const nextAcquired = { ...state.acquired, [key]: acquired };
  const usedPlayerIds = [...state.usedPlayerIds, player.id];
  const completed = ATTRIBUTES.every((attribute) => nextAcquired[attribute]);

  return {
    ...state,
    acquired: nextAcquired,
    usedPlayerIds,
    completed,
    currentPlayerId: completed ? "" : drawPlayer(usedPlayerIds).id,
  };
}

export function reroll(state: DraftState): DraftState {
  if (state.rerollsLeft <= 0 || state.completed) return state;

  const excluded = [...state.usedPlayerIds, state.currentPlayerId];
  return {
    ...state,
    rerollsLeft: state.rerollsLeft - 1,
    currentPlayerId: drawPlayer(excluded).id,
  };
}

export function calculateOverall(
  acquired: DraftState["acquired"],
  field: "currentValue" | "potentialValue",
): number {
  const total = ATTRIBUTES.reduce((sum, key) => {
    return sum + (acquired[key]?.[field] ?? 0) * ATTRIBUTE_WEIGHTS[key];
  }, 0);
  return Math.round(total);
}

export function determineArchetype(acquired: DraftState["acquired"]): string {
  const value = (key: AttributeKey) => acquired[key]?.currentValue ?? 0;
  const profiles = [
    {
      label: "Finalizador de área",
      score: value("boxPositioning") + value("placedFinish") + value("movement"),
    },
    {
      label: "Atacante de potência",
      score: value("strength") + value("shotPower") + value("aerial"),
    },
    {
      label: "Atacante móvel",
      score: value("speed") + value("dribbling") + value("movement"),
    },
    {
      label: "Atacante associativo",
      score: value("passing") + value("ballControl") + value("movement"),
    },
  ];

  return profiles.sort((a, b) => b.score - a.score)[0].label;
}

export function createIdentity(input: Omit<Identity, "academyClub">): Identity {
  return {
    ...input,
    academyClub: randomAcademy(input.nationality),
  };
}
