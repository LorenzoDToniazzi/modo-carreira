import type { AttributeKey, Nationality } from "./types";

export const STARTING_AGE = 16;
export const STARTING_PERCENT = 0.7;
export const POTENTIAL_BONUS = 10;
export const REROLLS_PER_CREATION = 3;

export const ATTRIBUTE_LABELS: Record<AttributeKey, string> = {
  speed: "Velocidade",
  physical: "Físico",
  strength: "Força",
  shooting: "Chute",
  passing: "Passe",
  movement: "Movimentação",
  placedFinish: "Finalização colocada",
  shotPower: "Força do chute",
  aerial: "Jogo aéreo",
  dribbling: "Drible",
  ballControl: "Controle de bola",
  boxPositioning: "Posicionamento na área",
};

export const ATTRIBUTE_SHORT_LABELS: Record<AttributeKey, string> = {
  speed: "VEL",
  physical: "FÍS",
  strength: "FOR",
  shooting: "CHU",
  passing: "PAS",
  movement: "MOV",
  placedFinish: "COL",
  shotPower: "POT",
  aerial: "AÉR",
  dribbling: "DRI",
  ballControl: "CON",
  boxPositioning: "POS",
};

export const ATTRIBUTE_WEIGHTS: Record<AttributeKey, number> = {
  speed: 0.07,
  physical: 0.05,
  strength: 0.06,
  shooting: 0.11,
  passing: 0.05,
  movement: 0.12,
  placedFinish: 0.13,
  shotPower: 0.08,
  aerial: 0.07,
  dribbling: 0.07,
  ballControl: 0.07,
  boxPositioning: 0.12,
};

export const NATIONALITIES: Record<Nationality, string> = {
  BR: "Brasil",
  AR: "Argentina",
  PT: "Portugal",
};

export const ACADEMY_CLUBS: Record<Nationality, string[]> = {
  BR: ["São José-RS", "Ferroviária", "Retrô", "Caxias"],
  AR: ["Chacarita Juniors", "Quilmes", "Ferro Carril Oeste", "Temperley"],
  PT: ["Académica", "Varzim", "Belenenses", "Lusitânia de Lourosa"],
};

export const RARITY_LABELS = {
  legend: "Lenda",
  epic: "Épico",
  rare: "Raro",
  uncommon: "Incomum",
  common: "Comum",
} as const;
