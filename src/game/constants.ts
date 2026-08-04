import type {
  AttributeKey,
  Nationality,
  Position,
  PositionAttribute,
  PositionConfig,
  Rarity,
} from "./types";

export const STARTING_AGE = 16;
export const MIN_STARTING_PERCENT = 0.65;
export const MAX_STARTING_PERCENT = 0.7;
export const MIN_POTENTIAL_GROWTH_PERCENT = 0.1;
export const MAX_POTENTIAL_GROWTH_PERCENT = 0.15;
export const REROLLS_PER_CREATION = 3;

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  king: 0.001,
  legend: 0.053,
  epic: 0.045,
  rare: 0.25,
  uncommon: 0.4,
  common: 0.251,
};

const attribute = (
  key: AttributeKey,
  label: string,
  shortLabel: string,
  weight: number,
): PositionAttribute => ({ key, label, shortLabel, weight });

export const POSITION_CONFIGS: Record<Position, PositionConfig> = {
  ATA: {
    label: "Atacante",
    description: "Chute, presença na área, finta e domínio aéreo ofensivo.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.08),
      attribute("shooting", "Chute", "CHU", 0.18),
      attribute("passing", "Passe", "PAS", 0.07),
      attribute("dribbling", "Drible", "DRI", 0.08),
      attribute("defending", "Defesa", "DEF", 0.02),
      attribute("physical", "Físico", "FÍS", 0.08),
      attribute("offensiveAerial", "Jogo aéreo ofensivo", "AÉR", 0.14),
      attribute("boxPositioning", "Posicionamento", "POS", 0.2),
      attribute("feint", "Finta", "FIN", 0.15),
    ],
    archetypes: [
      { label: "Finalizador de área", keys: ["shooting", "boxPositioning"] },
      { label: "Referência aérea", keys: ["offensiveAerial", "physical"] },
      { label: "Atacante de ruptura", keys: ["speed", "boxPositioning"] },
      { label: "Atacante técnico", keys: ["dribbling", "feint", "passing"] },
    ],
  },
  PON: {
    label: "Ponta",
    description: "Velocidade, finta, controle e repetição de ações pelo lado.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.15),
      attribute("shooting", "Chute", "CHU", 0.1),
      attribute("passing", "Passe", "PAS", 0.1),
      attribute("dribbling", "Drible", "DRI", 0.15),
      attribute("defending", "Defesa", "DEF", 0.03),
      attribute("physical", "Físico", "FÍS", 0.07),
      attribute("ballControl", "Controle de bola", "CON", 0.12),
      attribute("stamina", "Fôlego", "FÔL", 0.1),
      attribute("feint", "Finta", "FIN", 0.18),
    ],
    archetypes: [
      { label: "Ponta driblador", keys: ["dribbling", "feint"] },
      { label: "Ponta de profundidade", keys: ["speed", "stamina"] },
      { label: "Ponta criador", keys: ["passing", "ballControl"] },
      { label: "Ponta finalizador", keys: ["shooting", "speed"] },
    ],
  },
  MEI: {
    label: "Meia",
    description: "Criação, visão, ocupação de espaço e bola parada.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.05),
      attribute("shooting", "Chute", "CHU", 0.08),
      attribute("passing", "Passe", "PAS", 0.16),
      attribute("dribbling", "Drible", "DRI", 0.12),
      attribute("defending", "Defesa", "DEF", 0.05),
      attribute("physical", "Físico", "FÍS", 0.06),
      attribute("vision", "Visão", "VIS", 0.19),
      attribute("movement", "Movimentação", "MOV", 0.13),
      attribute("setPieces", "Bola parada", "BPR", 0.16),
    ],
    archetypes: [
      { label: "Camisa 10 clássico", keys: ["vision", "passing", "setPieces"] },
      { label: "Meia condutor", keys: ["dribbling", "movement"] },
      { label: "Meia de último passe", keys: ["vision", "passing"] },
      { label: "Meia artilheiro", keys: ["shooting", "movement"] },
    ],
  },
  VOL: {
    label: "Volante",
    description: "Proteção, leitura defensiva e saída de bola.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.05),
      attribute("shooting", "Chute", "CHU", 0.03),
      attribute("passing", "Passe", "PAS", 0.13),
      attribute("dribbling", "Drible", "DRI", 0.07),
      attribute("defending", "Defesa", "DEF", 0.16),
      attribute("physical", "Físico", "FÍS", 0.12),
      attribute("tackling", "Desarme", "DES", 0.15),
      attribute("interceptions", "Interceptação", "INT", 0.15),
      attribute("pressResistance", "Saída sob pressão", "PRE", 0.14),
    ],
    archetypes: [
      { label: "Volante marcador", keys: ["tackling", "interceptions", "physical"] },
      { label: "Regista", keys: ["passing", "pressResistance", "dribbling"] },
      { label: "Volante área a área", keys: ["speed", "physical", "passing"] },
      { label: "Volante de contenção", keys: ["defending", "interceptions", "tackling"] },
    ],
  },
  LAT: {
    label: "Lateral",
    description: "Corredor, apoio, cruzamento e recomposição.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.13),
      attribute("shooting", "Chute", "CHU", 0.03),
      attribute("passing", "Passe", "PAS", 0.1),
      attribute("dribbling", "Drible", "DRI", 0.07),
      attribute("defending", "Defesa", "DEF", 0.13),
      attribute("physical", "Físico", "FÍS", 0.09),
      attribute("crossing", "Cruzamento", "CRU", 0.15),
      attribute("stamina", "Fôlego", "FÔL", 0.15),
      attribute("recovery", "Recomposição", "REC", 0.15),
    ],
    archetypes: [
      { label: "Lateral ofensivo", keys: ["crossing", "passing", "dribbling"] },
      { label: "Lateral marcador", keys: ["defending", "recovery", "physical"] },
      { label: "Ala de profundidade", keys: ["speed", "stamina", "crossing"] },
      { label: "Lateral construtor", keys: ["passing", "dribbling", "recovery"] },
    ],
  },
  ZAG: {
    label: "Zagueiro",
    description: "Marcação, antecipação e domínio da área.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.08),
      attribute("shooting", "Chute", "CHU", 0.01),
      attribute("passing", "Passe", "PAS", 0.07),
      attribute("dribbling", "Drible", "DRI", 0.03),
      attribute("defending", "Defesa", "DEF", 0.21),
      attribute("physical", "Físico", "FÍS", 0.15),
      attribute("aerial", "Jogo aéreo", "AÉR", 0.15),
      attribute("marking", "Marcação", "MAR", 0.16),
      attribute("timing", "Tempo de bola", "TEM", 0.14),
    ],
    archetypes: [
      { label: "Zagueiro antecipador", keys: ["timing", "defending", "speed"] },
      { label: "Zagueiro de imposição", keys: ["physical", "aerial", "marking"] },
      { label: "Zagueiro técnico", keys: ["passing", "dribbling", "timing"] },
      { label: "Zagueiro de cobertura", keys: ["speed", "defending", "timing"] },
    ],
  },
  GOL: {
    label: "Goleiro",
    description: "Oito características próprias da função, sem atributos globais.",
    attributes: [
      attribute("reflexes", "Reflexos", "REF", 0.2),
      attribute("footwork", "Jogo com os pés", "PÉS", 0.1),
      attribute("jumping", "Impulsão", "IMP", 0.1),
      attribute("aerialControl", "Jogo aéreo", "AÉR", 0.15),
      attribute("penaltySaving", "Defesa de pênaltis", "PÊN", 0.08),
      attribute("lowExit", "Saída de bola", "SAÍ", 0.12),
      attribute("goalkeepingPositioning", "Posicionamento", "POS", 0.2),
      attribute("height", "Altura", "ALT", 0.05),
    ],
    archetypes: [
      { label: "Goleiro de reflexo", keys: ["reflexes", "jumping", "lowExit"] },
      { label: "Goleiro-líbero", keys: ["footwork", "lowExit", "goalkeepingPositioning"] },
      { label: "Guardião de área", keys: ["aerialControl", "height", "goalkeepingPositioning"] },
      { label: "Especialista em decisões", keys: ["penaltySaving", "reflexes", "goalkeepingPositioning"] },
    ],
  },
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
  king: "Rei",
  legend: "Lenda",
  epic: "Épico",
  rare: "Raro",
  uncommon: "Incomum",
  common: "Comum",
} as const;
