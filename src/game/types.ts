export const ATTRIBUTES = [
  "speed",
  "physical",
  "strength",
  "shooting",
  "passing",
  "movement",
  "placedFinish",
  "shotPower",
  "aerial",
  "dribbling",
  "ballControl",
  "boxPositioning",
] as const;

export type AttributeKey = (typeof ATTRIBUTES)[number];
export type Rarity = "legend" | "epic" | "rare" | "uncommon" | "common";
export type Nationality = "BR" | "AR" | "PT";
export type Position = "ATA";

export type AttributeMap = Record<AttributeKey, number>;

export interface SourcePlayer {
  id: string;
  name: string;
  country: string;
  peak: string;
  positions: Position[];
  rarity: Rarity;
  attributes: AttributeMap;
  note: string;
}

export interface Identity {
  name: string;
  nationality: Nationality;
  position: Position;
  dominantFoot: "D" | "E";
  heartClub: string;
  academyClub: string;
}

export interface AcquiredAttribute {
  key: AttributeKey;
  sourcePlayerId: string;
  sourcePlayerName: string;
  sourceValue: number;
  currentValue: number;
  potentialValue: number;
}

export interface DraftState {
  identity: Identity;
  acquired: Partial<Record<AttributeKey, AcquiredAttribute>>;
  usedPlayerIds: string[];
  currentPlayerId: string;
  rerollsLeft: number;
  completed: boolean;
}
