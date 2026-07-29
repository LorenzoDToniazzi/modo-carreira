import type {
  AttributeKey,
  Nationality,
  Position,
  PositionAttribute,
  PositionConfig,
  Rarity,
} from "./types";

export const STARTING_AGE = 16;
export const STARTING_PERCENT = 0.7;
export const REROLLS_PER_CREATION = 3;

export const RARITY_WEIGHTS: Record<Rarity, number> = {
  legend: 0.02,
  epic: 0.05,
  rare: 0.25,
  uncommon: 0.4,
  common: 0.28,
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
    description: "Finalização, presença na área e repertório ofensivo.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.07),
      attribute("physical", "Físico", "FÍS", 0.05),
      attribute("strength", "Força", "FOR", 0.06),
      attribute("shooting", "Chute", "CHU", 0.11),
      attribute("passing", "Passe", "PAS", 0.05),
      attribute("movement", "Movimentação", "MOV", 0.12),
      attribute("placedFinish", "Finalização colocada", "COL", 0.13),
      attribute("shotPower", "Força do chute", "POT", 0.08),
      attribute("aerial", "Jogo aéreo", "AÉR", 0.07),
      attribute("dribbling", "Drible", "DRI", 0.07),
      attribute("ballControl", "Controle de bola", "CON", 0.07),
      attribute("boxPositioning", "Posicionamento na área", "POS", 0.12),
    ],
    archetypes: [
      { label: "Finalizador de área", keys: ["boxPositioning", "placedFinish", "movement"] },
      { label: "Atacante de potência", keys: ["strength", "shotPower", "aerial"] },
      { label: "Atacante móvel", keys: ["speed", "dribbling", "movement"] },
      { label: "Atacante associativo", keys: ["passing", "ballControl", "movement"] },
    ],
  },
  PON: {
    label: "Ponta",
    description: "Explosão, um contra um e produção pelos lados.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.1),
      attribute("physical", "Físico", "FÍS", 0.04),
      attribute("strength", "Força", "FOR", 0.03),
      attribute("shooting", "Chute", "CHU", 0.07),
      attribute("passing", "Passe", "PAS", 0.06),
      attribute("movement", "Movimentação", "MOV", 0.09),
      attribute("acceleration", "Aceleração", "ACE", 0.1),
      attribute("dribbling", "Drible", "DRI", 0.12),
      attribute("crossing", "Cruzamento", "CRU", 0.09),
      attribute("agility", "Agilidade", "AGI", 0.09),
      attribute("placedFinish", "Finalização colocada", "COL", 0.09),
      attribute("oneOnOne", "Um contra um", "1X1", 0.12),
    ],
    archetypes: [
      { label: "Ponta driblador", keys: ["dribbling", "agility", "oneOnOne"] },
      { label: "Ponta de profundidade", keys: ["speed", "acceleration", "movement"] },
      { label: "Ponta criador", keys: ["passing", "crossing", "dribbling"] },
      { label: "Ponta finalizador", keys: ["shooting", "placedFinish", "movement"] },
    ],
  },
  MEI: {
    label: "Meia",
    description: "Criação, controle do ritmo e último passe.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.04),
      attribute("physical", "Físico", "FÍS", 0.04),
      attribute("strength", "Força", "FOR", 0.03),
      attribute("shooting", "Chute", "CHU", 0.07),
      attribute("passing", "Passe", "PAS", 0.12),
      attribute("movement", "Movimentação", "MOV", 0.08),
      attribute("vision", "Visão", "VIS", 0.13),
      attribute("longPassing", "Passe longo", "PLG", 0.1),
      attribute("ballControl", "Controle de bola", "CON", 0.11),
      attribute("dribbling", "Drible", "DRI", 0.09),
      attribute("placedFinish", "Chute colocado", "COL", 0.08),
      attribute("setPieces", "Bola parada", "BPR", 0.11),
    ],
    archetypes: [
      { label: "Camisa 10 clássico", keys: ["vision", "passing", "ballControl"] },
      { label: "Meia condutor", keys: ["dribbling", "movement", "ballControl"] },
      { label: "Meia de último passe", keys: ["vision", "longPassing", "passing"] },
      { label: "Meia artilheiro", keys: ["shooting", "placedFinish", "movement"] },
    ],
  },
  VOL: {
    label: "Volante",
    description: "Proteção, leitura defensiva e saída de bola.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.04),
      attribute("physical", "Físico", "FÍS", 0.08),
      attribute("strength", "Força", "FOR", 0.07),
      attribute("passing", "Passe", "PAS", 0.08),
      attribute("movement", "Movimentação", "MOV", 0.05),
      attribute("tackling", "Desarme", "DES", 0.12),
      attribute("interceptions", "Interceptação", "INT", 0.12),
      attribute("stamina", "Fôlego", "FÔL", 0.1),
      attribute("vision", "Visão", "VIS", 0.08),
      attribute("longPassing", "Passe longo", "PLG", 0.09),
      attribute("pressResistance", "Saída sob pressão", "PRE", 0.1),
      attribute("ballControl", "Controle de bola", "CON", 0.07),
    ],
    archetypes: [
      { label: "Volante marcador", keys: ["tackling", "interceptions", "physical"] },
      { label: "Regista", keys: ["longPassing", "vision", "pressResistance"] },
      { label: "Volante área a área", keys: ["stamina", "movement", "physical"] },
      { label: "Volante de contenção", keys: ["strength", "interceptions", "tackling"] },
    ],
  },
  LAT: {
    label: "Lateral",
    description: "Corredor, apoio, cruzamento e recomposição.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.1),
      attribute("physical", "Físico", "FÍS", 0.06),
      attribute("strength", "Força", "FOR", 0.04),
      attribute("passing", "Passe", "PAS", 0.06),
      attribute("movement", "Movimentação", "MOV", 0.06),
      attribute("tackling", "Desarme", "DES", 0.09),
      attribute("crossing", "Cruzamento", "CRU", 0.11),
      attribute("stamina", "Fôlego", "FÔL", 0.1),
      attribute("recovery", "Recomposição", "REC", 0.11),
      attribute("support", "Apoio", "APO", 0.1),
      attribute("defensiveOneOnOne", "Um contra um defensivo", "1X1", 0.1),
      attribute("ballControl", "Controle de bola", "CON", 0.07),
    ],
    archetypes: [
      { label: "Lateral ofensivo", keys: ["support", "crossing", "movement"] },
      { label: "Lateral marcador", keys: ["tackling", "defensiveOneOnOne", "recovery"] },
      { label: "Ala de profundidade", keys: ["speed", "stamina", "support"] },
      { label: "Lateral construtor", keys: ["passing", "ballControl", "movement"] },
    ],
  },
  ZAG: {
    label: "Zagueiro",
    description: "Marcação, antecipação e domínio da área.",
    attributes: [
      attribute("speed", "Velocidade", "VEL", 0.05),
      attribute("physical", "Físico", "FÍS", 0.07),
      attribute("strength", "Força", "FOR", 0.09),
      attribute("passing", "Passe", "PAS", 0.05),
      attribute("aerial", "Jogo aéreo", "AÉR", 0.1),
      attribute("tackling", "Desarme", "DES", 0.12),
      attribute("interceptions", "Interceptação", "INT", 0.11),
      attribute("timing", "Tempo de bola", "TEM", 0.11),
      attribute("marking", "Marcação", "MAR", 0.11),
      attribute("concentration", "Concentração", "CNC", 0.08),
      attribute("recovery", "Recuperação", "REC", 0.06),
      attribute("ballControl", "Controle de bola", "CON", 0.05),
    ],
    archetypes: [
      { label: "Zagueiro antecipador", keys: ["interceptions", "timing", "recovery"] },
      { label: "Zagueiro de imposição", keys: ["strength", "aerial", "marking"] },
      { label: "Zagueiro técnico", keys: ["passing", "ballControl", "concentration"] },
      { label: "Zagueiro de cobertura", keys: ["speed", "recovery", "tackling"] },
    ],
  },
  GOL: {
    label: "Goleiro",
    description: "Defesa do gol, domínio da área e reposição.",
    attributes: [
      attribute("reflexes", "Reflexo", "REF", 0.14),
      attribute("goalkeepingPositioning", "Posicionamento", "POS", 0.12),
      attribute("handling", "Encaixe", "ENC", 0.09),
      attribute("aerialControl", "Jogo aéreo", "AÉR", 0.09),
      attribute("distribution", "Reposição", "REP", 0.08),
      attribute("oneOnOne", "Um contra um", "1X1", 0.11),
      attribute("footwork", "Jogo com os pés", "PÉS", 0.08),
      attribute("concentration", "Concentração", "CNC", 0.08),
      attribute("agility", "Agilidade", "AGI", 0.07),
      attribute("kickingPower", "Força da reposição", "POT", 0.04),
      attribute("penaltySaving", "Defesa de pênaltis", "PÊN", 0.05),
      attribute("lowExit", "Saída rasteira", "SAÍ", 0.05),
    ],
    archetypes: [
      { label: "Goleiro de reflexo", keys: ["reflexes", "agility", "oneOnOne"] },
      { label: "Goleiro-líbero", keys: ["footwork", "lowExit", "distribution"] },
      { label: "Guardião de área", keys: ["aerialControl", "handling", "goalkeepingPositioning"] },
      { label: "Especialista em decisões", keys: ["penaltySaving", "concentration", "oneOnOne"] },
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
  legend: "Lenda",
  epic: "Épico",
  rare: "Raro",
  uncommon: "Incomum",
  common: "Comum",
} as const;
