import {
  ACADEMY_CLUBS,
  MAX_POTENTIAL_GROWTH_PERCENT,
  MAX_STARTING_PERCENT,
  MIN_POTENTIAL_GROWTH_PERCENT,
  MIN_STARTING_PERCENT,
  POSITION_CONFIGS,
  RARITY_WEIGHTS,
} from "./constants";
import { SOURCE_ROLE_WEIGHTS } from "./improvised";
import { PLAYER_DRAW_GROUPS } from "./players";
import type {
  AcquiredAttribute,
  AttributeKey,
  DraftState,
  Identity,
  Nationality,
  Position,
  Rarity,
  SourcePlayer,
  SourceRole,
} from "./types";

const RARITIES: Rarity[] = [
  "king",
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

function weightedRole(
  roles: {
    role: SourceRole;
    players: SourcePlayer[];
  }[],
): SourceRole {
  const totalWeight = roles.reduce(
    (total, { role }) => total + SOURCE_ROLE_WEIGHTS[role],
    0,
  );
  let roll = Math.random() * totalWeight;

  for (const { role } of roles) {
    roll -= SOURCE_ROLE_WEIGHTS[role];
    if (roll < 0) return role;
  }

  return roles[roles.length - 1].role;
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
  const rarity = randomRarity();
  const groups = PLAYER_DRAW_GROUPS[position];
  const roles: SourceRole[] = ["natural", "primary", "alternative"];
  const eligibleRoles = roles.flatMap((role) => {
    const available = groups[role].filter(
      (player) =>
        player.rarity === rarity && !excludedIds.includes(player.id),
    );
    return available.length ? [{ role, players: available }] : [];
  });

  if (!eligibleRoles.length) {
    const fallback = roles.flatMap((role) =>
      groups[role].filter((player) => !excludedIds.includes(player.id)),
    );
    return weightedPlayer(fallback);
  }

  const role = weightedRole(eligibleRoles);
  const rolePool = eligibleRoles.find((group) => group.role === role)!.players;
  return weightedPlayer(rolePool);
}

function randomPercent(minimum: number, maximum: number): number {
  return minimum + Math.random() * (maximum - minimum);
}

export function calculateStartingValue(
  sourceValue: number,
  startingPercent = randomPercent(
    MIN_STARTING_PERCENT,
    MAX_STARTING_PERCENT,
  ),
): number {
  return Math.round(sourceValue * startingPercent);
}

export function calculatePotential(
  sourceValue: number,
  growthPercent = MAX_POTENTIAL_GROWTH_PERCENT,
): number {
  return Math.min(99, Math.round(sourceValue * (1 + growthPercent)));
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

  const startingPercent = randomPercent(
    MIN_STARTING_PERCENT,
    MAX_STARTING_PERCENT,
  );
  const acquired: AcquiredAttribute = {
    key,
    sourcePlayerId: player.id,
    sourcePlayerName: player.name,
    sourcePosition: player.sourcePosition,
    sourceRole: player.sourceRole,
    sourceValue,
    naturalCeiling: sourceValue,
    startingPercent,
    currentValue: calculateStartingValue(sourceValue, startingPercent),
    basePotentialValue: calculatePotential(
      sourceValue,
      MIN_POTENTIAL_GROWTH_PERCENT,
    ),
    potentialValue: calculatePotential(
      sourceValue,
      MAX_POTENTIAL_GROWTH_PERCENT,
    ),
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
  field:
    | "currentValue"
    | "naturalCeiling"
    | "basePotentialValue"
    | "potentialValue",
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
