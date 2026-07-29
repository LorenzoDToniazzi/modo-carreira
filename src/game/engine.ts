import {
  ACADEMY_CLUBS,
  POSITION_CONFIGS,
  RARITY_WEIGHTS,
  STARTING_PERCENT,
} from "./constants";
import { PLAYER_POOLS } from "./players";
import type {
  AcquiredAttribute,
  AttributeKey,
  DraftState,
  Identity,
  Nationality,
  Position,
  Rarity,
  SourcePlayer,
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

function weightedPlayer(items: SourcePlayer[]): SourcePlayer {
  const totalWeight = items.reduce(
    (total, player) => total + (player.drawWeight ?? 1),
    0,
  );
  let roll = Math.random() * totalWeight;

  for (const player of items) {
    roll -= player.drawWeight ?? 1;
    if (roll < 0) return player;
  }

  return items[items.length - 1];
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

export function drawPlayer(
  position: Position,
  excludedIds: string[] = [],
): SourcePlayer {
  const players = PLAYER_POOLS[position];
  const available = players.filter((player) => !excludedIds.includes(player.id));
  const pool = available.length ? available : players;
  const rarity = randomRarity();
  const rarityPool = pool.filter((player) => player.rarity === rarity);
  return weightedPlayer(rarityPool.length ? rarityPool : pool);
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
  if (sourceValue === undefined) {
    throw new Error(`${player.name} não possui o atributo ${key}.`);
  }

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
  const keys = POSITION_CONFIGS[state.identity.position].attributes.map(
    ({ key: attributeKey }) => attributeKey,
  );
  const completed = keys.every((attributeKey) => nextAcquired[attributeKey]);

  return {
    ...state,
    acquired: nextAcquired,
    usedPlayerIds,
    completed,
    currentPlayerId: completed
      ? ""
      : drawPlayer(state.identity.position, usedPlayerIds).id,
  };
}

export function reroll(state: DraftState): DraftState {
  if (state.rerollsLeft <= 0 || state.completed) return state;

  const excluded = [...state.usedPlayerIds, state.currentPlayerId];
  return {
    ...state,
    rerollsLeft: state.rerollsLeft - 1,
    currentPlayerId: drawPlayer(state.identity.position, excluded).id,
  };
}

export function calculateOverall(
  position: Position,
  acquired: DraftState["acquired"],
  field: "currentValue" | "potentialValue",
): number {
  const total = POSITION_CONFIGS[position].attributes.reduce(
    (sum, attribute) =>
      sum + (acquired[attribute.key]?.[field] ?? 0) * attribute.weight,
    0,
  );
  return Math.round(total);
}

export function determineArchetype(
  position: Position,
  acquired: DraftState["acquired"],
): string {
  const value = (key: AttributeKey) => acquired[key]?.currentValue ?? 0;
  const profiles = POSITION_CONFIGS[position].archetypes.map((profile) => ({
    label: profile.label,
    score: profile.keys.reduce((total, key) => total + value(key), 0),
  }));

  return profiles.sort((a, b) => b.score - a.score)[0].label;
}

export function createIdentity(input: Omit<Identity, "academyClub">): Identity {
  return {
    ...input,
    academyClub: randomAcademy(input.nationality),
  };
}
