export const POSITIONS = ["GOL", "ZAG", "LAT", "VOL", "MEI", "PON", "ATA"] as const;

export type Position = (typeof POSITIONS)[number];
export type Rarity =
  | "king"
  | "legend"
  | "epic"
  | "rare"
  | "uncommon"
  | "common";
export type SourceRole = "natural" | "primary" | "alternative";
export type Nationality = "BR" | "AR" | "PT";

export type AttributeKey =
  | "speed"
  | "shooting"
  | "passing"
  | "dribbling"
  | "defending"
  | "physical"
  | "offensiveAerial"
  | "boxPositioning"
  | "feint"
  | "ballControl"
  | "crossing"
  | "stamina"
  | "vision"
  | "movement"
  | "setPieces"
  | "tackling"
  | "interceptions"
  | "pressResistance"
  | "recovery"
  | "aerial"
  | "timing"
  | "marking"
  | "reflexes"
  | "footwork"
  | "jumping"
  | "aerialControl"
  | "penaltySaving"
  | "lowExit"
  | "goalkeepingPositioning"
  | "height";

export type AttributeMap = Partial<Record<AttributeKey, number>>;

export interface PositionAttribute {
  key: AttributeKey;
  label: string;
  shortLabel: string;
  weight: number;
}

export interface ArchetypeDefinition {
  label: string;
  keys: AttributeKey[];
}

export interface PositionConfig {
  label: string;
  description: string;
  attributes: PositionAttribute[];
  archetypes: ArchetypeDefinition[];
}

export interface SourcePlayer {
  id: string;
  name: string;
  country: string;
  peak: string;
  positions: Position[];
  sourcePosition?: Position;
  sourceRole?: SourceRole;
  rarity: Rarity;
  attributes: AttributeMap;
  note: string;
  drawWeight?: number;
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
  sourcePosition?: Position;
  sourceRole?: SourceRole;
  sourceValue: number;
  naturalCeiling: number;
  startingPercent: number;
  currentValue: number;
  basePotentialValue: number;
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
