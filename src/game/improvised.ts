import { POSITION_CONFIGS } from "./constants";
import {
  POSITIONS,
  type AttributeKey,
  type AttributeMap,
  type Position,
  type SourcePlayer,
  type SourceRole,
} from "./types";

export const SOURCE_ROLE_WEIGHTS: Record<SourceRole, number> = {
  natural: 0.85,
  primary: 0.1,
  alternative: 0.05,
};

export interface PlayerDrawGroups {
  natural: SourcePlayer[];
  primary: SourcePlayer[];
  alternative: SourcePlayer[];
}

type NaturalPools = Record<Position, SourcePlayer[]>;

interface EligibilityGroup {
  sourcePosition: Position;
  playerIds: string[];
}

interface PositionEligibility {
  primary?: EligibilityGroup;
  alternative?: EligibilityGroup;
}

export const SOURCE_POSITION_RULES: Record<Position, PositionEligibility> = {
  ATA: {
    primary: {
      sourcePosition: "PON",
      playerIds: [
        "pon-messi",
        "pon-ronaldinho",
        "pon-neymar",
        "pon-cristiano",
        "pon-jairzinho",
        "pon-salah",
        "pon-mbappe",
        "pon-bale",
        "pon-mane",
        "pon-stoichkov",
        "pon-renato-gaucho",
        "pon-vini-jr",
        "pon-alexis",
        "pon-bruno-henrique",
        "pon-muller",
        "pon-son",
        "pon-rodrygo",
        "pon-edilson",
        "pon-amarildo",
        "pon-dagoberto",
        "pon-lucas-moura",
        "pon-paulinho-atletico",
        "pon-martinelli",
        "pon-chiesa",
        "pon-ferran-torres",
        "pon-rony",
        "pon-jorge-henrique",
        "pon-romero",
        "pon-vitinho",
      ],
    },
    alternative: {
      sourcePosition: "MEI",
      playerIds: [
        "mei-maradona",
        "mei-cruyff",
        "mei-ronaldinho",
        "mei-zico",
        "mei-socrates",
        "mei-rivaldo",
        "mei-kaka",
        "mei-tostao",
        "mei-gullit",
        "mei-rai",
        "mei-alex",
        "mei-djalminha",
        "mei-coutinho",
        "mei-pedro-rocha",
        "mei-juan-mata",
        "mei-talisca",
        "mei-luan",
        "mei-giovanni",
        "mei-arrascaeta",
        "mei-paqueta",
        "mei-carlos-alberto",
        "mei-maicosuel",
        "mei-cazares",
        "mei-carlos-eduardo",
      ],
    },
  },
  PON: {
    primary: {
      sourcePosition: "LAT",
      playerIds: [
        "lat-cafu",
        "lat-roberto-carlos",
        "lat-carlos-alberto",
        "lat-zanetti",
        "lat-marcelo",
        "lat-dani-alves",
        "lat-junior",
        "lat-maicon",
        "lat-marinho-chagas",
        "lat-paul-breitner",
        "lat-hakimi",
        "lat-cancelo",
        "lat-theo",
        "lat-alphonso-davies",
        "lat-frimpong",
        "lat-sorin",
        "lat-leo-moura",
        "lat-rodinei",
        "lat-arana",
        "lat-ayrton-lucas",
        "lat-cicinho",
        "lat-reinaldo",
        "lat-alex-telles",
        "lat-pikachu",
        "lat-vanderson",
        "lat-wesley",
        "lat-juninho-capixaba",
      ],
    },
    alternative: {
      sourcePosition: "ATA",
      playerIds: [
        "pele",
        "ronaldo",
        "eusebio",
        "henry",
        "eto",
        "george-weah",
        "rooney",
        "tevez",
        "villa",
        "aubameyang",
        "hulk",
        "van-persie",
        "forlan",
        "gabriel-jesus",
        "richarlison",
        "alexandre-pato",
        "nilmar",
        "vagner-love",
        "arnautovic",
        "obafemi-martins",
        "podolski",
        "gameiro",
        "defoe",
      ],
    },
  },
  MEI: {
    primary: {
      sourcePosition: "VOL",
      playerIds: [
        "vol-pirlo",
        "vol-falcao",
        "vol-matthaus",
        "vol-redondo",
        "vol-busquets",
        "vol-seedorf",
        "vol-xabi-alonso",
        "vol-yaya-toure",
        "vol-cerezo",
        "vol-rodri",
        "vol-rijkaard",
        "vol-hernanes",
        "vol-schweinsteiger",
        "vol-toni-kroos",
        "vol-thiago-alcantara",
        "vol-valverde",
        "vol-paulinho",
        "vol-jorginho",
        "vol-mazinho",
        "vol-bruno-guimaraes",
        "vol-gerson",
        "vol-ze-rafael",
        "vol-elias",
        "vol-nainggolan",
        "vol-guarin",
        "vol-fred-vol",
        "vol-ramiro",
        "vol-richarlyson",
        "vol-thiago-maia",
        "vol-otavio",
      ],
    },
    alternative: {
      sourcePosition: "PON",
      playerIds: [
        "pon-messi",
        "pon-ronaldinho",
        "pon-neymar",
        "pon-figo",
        "pon-ribery",
        "pon-di-maria",
        "pon-hazard",
        "pon-zagallo",
        "pon-paulo-cezar-caju",
        "pon-zinho",
        "pon-willian",
        "pon-mahrez",
        "pon-saka",
        "pon-bernard",
        "pon-tayson",
        "pon-soteldo",
        "pon-grealish",
        "pon-malcom",
        "pon-marlos",
        "pon-vitinho",
        "pon-jorge-henrique",
        "pon-romero",
      ],
    },
  },
  VOL: {
    primary: {
      sourcePosition: "MEI",
      playerIds: [
        "mei-didi",
        "mei-gerson-canhotinha",
        "mei-socrates",
        "mei-modric",
        "mei-xavi",
        "mei-gullit",
        "mei-gerrard",
        "mei-scholes",
        "mei-lampard",
        "mei-iniesta",
        "mei-ze-roberto",
        "mei-rakitic",
        "mei-fabregas",
        "mei-deco",
        "mei-valdo",
        "mei-renato-augusto",
        "mei-paqueta",
        "mei-de-la-cruz",
        "mei-oscar",
        "mei-diego",
        "mei-carlos-alberto",
        "mei-matheus-pereira",
        "mei-ricardinho",
      ],
    },
    alternative: {
      sourcePosition: "ZAG",
      playerIds: [
        "zag-beckenbauer",
        "zag-thiago-silva",
        "zag-desailly",
        "zag-koeman",
        "zag-mauro-galvao",
        "zag-lucio",
        "zag-aldair",
        "zag-marquinhos",
        "zag-david-luiz",
        "zag-edinho",
        "zag-hummels",
        "zag-militao",
        "zag-rodrigo-caio",
        "zag-dante",
        "zag-naldo",
        "zag-lisandro-martinez",
        "zag-leo-pereira",
        "zag-henrique",
        "zag-paulo-andre",
        "zag-fabricio-bruno",
        "zag-rodrigo-moledo",
      ],
    },
  },
  LAT: {
    primary: {
      sourcePosition: "PON",
      playerIds: [
        "pon-bale",
        "pon-zagallo",
        "pon-saka",
        "pon-willian",
        "pon-raphinha",
        "pon-zinho",
        "pon-chiesa",
        "pon-tayson",
        "pon-antony",
        "pon-luiz-araujo",
        "pon-paulinho-atletico",
        "pon-jorge-henrique",
        "pon-romero",
        "pon-rony",
      ],
    },
    alternative: {
      sourcePosition: "ZAG",
      playerIds: [
        "zag-sergio-ramos",
        "zag-puyol",
        "zag-lucio",
        "zag-marquinhos",
        "zag-militao",
        "zag-juan",
        "zag-lisandro-martinez",
        "zag-dante",
        "zag-cristian-romero",
        "zag-fabricio-bruno",
        "zag-henrique",
      ],
    },
  },
  ZAG: {
    primary: {
      sourcePosition: "VOL",
      playerIds: [
        "vol-busquets",
        "vol-matthaus",
        "vol-rijkaard",
        "vol-casemiro",
        "vol-gilberto-silva",
        "vol-dunga",
        "vol-mascherano",
        "vol-fernandinho",
        "vol-felipe-melo",
        "vol-de-rossi",
        "vol-edmilson",
        "vol-fabinho",
        "vol-matic",
        "vol-danilo",
        "vol-thiago-maia",
        "vol-jucilei",
        "vol-richarlyson",
        "vol-nilton",
      ],
    },
    alternative: {
      sourcePosition: "LAT",
      playerIds: [
        "lat-nilton-santos",
        "lat-carlos-alberto",
        "lat-djalma-santos",
        "lat-maldini",
        "lat-thuram",
        "lat-ruud-krol",
        "lat-filipe-luis",
        "lat-abidal",
        "lat-azpilicueta",
        "lat-ivanovic",
        "lat-walker",
        "lat-danilo",
        "lat-alex-sandro",
        "lat-darmian",
        "lat-emerson-royal",
      ],
    },
  },
  GOL: {},
};

const ATTRIBUTE_OVERRIDES: Partial<
  Record<Position, Record<string, AttributeMap>>
> = {
  ATA: {
    "pon-neymar": {
      speed: 84,
      setPieces: 89,
      strength: 59,
      shooting: 86,
      passing: 88,
      movement: 87,
      placedFinish: 94,
      shotPower: 82,
      aerial: 55,
      dribbling: 94,
      ballControl: 95,
      boxPositioning: 84,
    },
    "pon-ronaldinho": {
      speed: 83,
      setPieces: 96,
      strength: 71,
      shooting: 84,
      passing: 89,
      movement: 86,
      placedFinish: 89,
      shotPower: 87,
      aerial: 67,
      dribbling: 96,
      ballControl: 97,
      boxPositioning: 80,
    },
    "pon-jairzinho": {
      speed: 89,
      setPieces: 73,
      strength: 82,
      shooting: 86,
      passing: 78,
      movement: 89,
      placedFinish: 86,
      shotPower: 88,
      aerial: 81,
      dribbling: 89,
      ballControl: 87,
      boxPositioning: 89,
    },
  },
};

function average(
  player: SourcePlayer,
  keys: AttributeKey[],
  adjustment = 0,
): number {
  const values = keys
    .map((key) => player.attributes[key])
    .filter((value): value is number => value !== undefined);
  const fallback = Object.values(player.attributes);
  const selected = values.length ? values : fallback;
  return (
    selected.reduce((total, value) => total + value, 0) / selected.length +
    adjustment
  );
}

function derivedAttribute(
  player: SourcePlayer,
  key: AttributeKey,
  role: Exclude<SourceRole, "natural">,
): number {
  const direct = player.attributes[key];
  if (direct !== undefined) return direct;

  const penalty = role === "primary" ? 2 : 4;
  const derived: Record<AttributeKey, () => number> = {
    speed: () => average(player, ["acceleration", "agility", "recovery"], -penalty),
    physical: () => average(player, ["strength", "stamina", "movement"], -penalty),
    strength: () => average(player, ["physical", "aerial", "stamina"], -penalty),
    shooting: () =>
      average(player, ["placedFinish", "shotPower", "setPieces"], -2 - penalty),
    passing: () =>
      average(player, ["vision", "longPassing", "crossing", "ballControl"], -penalty),
    movement: () =>
      average(player, ["acceleration", "support", "stamina", "boxPositioning"], -penalty),
    placedFinish: () =>
      average(player, ["shooting", "setPieces", "boxPositioning"], -2 - penalty),
    shotPower: () =>
      average(player, ["shooting", "setPieces", "strength", "physical"], -penalty),
    aerial: () =>
      average(player, ["strength", "physical", "boxPositioning"], -5 - penalty),
    dribbling: () =>
      average(player, ["ballControl", "agility", "oneOnOne"], -penalty),
    ballControl: () =>
      average(player, ["dribbling", "pressResistance", "passing"], -penalty),
    boxPositioning: () =>
      average(player, ["movement", "placedFinish", "oneOnOne"], -penalty),
    acceleration: () => average(player, ["speed", "agility"], -penalty),
    crossing: () => average(player, ["passing", "setPieces", "support"], -penalty),
    agility: () => average(player, ["speed", "dribbling", "acceleration"], -penalty),
    oneOnOne: () =>
      average(player, ["dribbling", "placedFinish", "acceleration"], -penalty),
    vision: () => average(player, ["passing", "longPassing", "ballControl"], -penalty),
    longPassing: () =>
      average(player, ["passing", "vision", "crossing"], -penalty),
    setPieces: () =>
      average(player, ["passing", "shooting", "crossing"], -3 - penalty),
    tackling: () =>
      average(
        player,
        ["interceptions", "defensiveOneOnOne", "physical", "strength"],
        -6 - penalty,
      ),
    interceptions: () =>
      average(player, ["tackling", "marking", "concentration"], -penalty),
    stamina: () => average(player, ["physical", "movement", "recovery"], -penalty),
    pressResistance: () =>
      average(player, ["ballControl", "passing", "strength", "dribbling"], -penalty),
    recovery: () =>
      average(player, ["speed", "movement", "stamina", "defensiveOneOnOne"], -penalty),
    support: () => average(player, ["movement", "crossing", "stamina"], -penalty),
    defensiveOneOnOne: () =>
      average(
        player,
        ["tackling", "recovery", "physical", "oneOnOne"],
        -4 - penalty,
      ),
    timing: () =>
      average(player, ["interceptions", "tackling", "concentration"], -penalty),
    marking: () =>
      average(player, ["tackling", "interceptions", "defensiveOneOnOne"], -penalty),
    concentration: () =>
      average(
        player,
        ["pressResistance", "ballControl", "interceptions", "boxPositioning"],
        -penalty,
      ),
    reflexes: () => average(player, [], -penalty),
    goalkeepingPositioning: () => average(player, [], -penalty),
    handling: () => average(player, [], -penalty),
    aerialControl: () => average(player, ["aerial"], -penalty),
    distribution: () => average(player, ["passing", "longPassing"], -penalty),
    footwork: () => average(player, ["ballControl", "passing"], -penalty),
    kickingPower: () => average(player, ["shotPower", "strength"], -penalty),
    penaltySaving: () => average(player, ["oneOnOne", "concentration"], -penalty),
    lowExit: () => average(player, ["speed", "recovery"], -penalty),
  };

  return Math.max(35, Math.min(97, Math.round(derived[key]())));
}

function adaptPlayer(
  player: SourcePlayer,
  targetPosition: Position,
  sourcePosition: Position,
  role: Exclude<SourceRole, "natural">,
): SourcePlayer {
  const override = ATTRIBUTE_OVERRIDES[targetPosition]?.[player.id] ?? {};
  const attributes = Object.fromEntries(
    POSITION_CONFIGS[targetPosition].attributes.map(({ key }) => [
      key,
      override[key] ?? derivedAttribute(player, key, role),
    ]),
  );

  return {
    ...player,
    id: `${targetPosition.toLowerCase()}-from-${player.id}`,
    positions: [targetPosition, sourcePosition],
    sourcePosition,
    sourceRole: role,
    attributes,
    note: `${player.note} Nesta carta, aparece adaptado de ${sourcePosition} para ${targetPosition}.`,
  };
}

function createRolePool(
  naturalPools: NaturalPools,
  targetPosition: Position,
  role: Exclude<SourceRole, "natural">,
  group: EligibilityGroup | undefined,
  occupiedNames: Set<string>,
): SourcePlayer[] {
  if (!group) return [];

  const sourceById = new Map(
    naturalPools[group.sourcePosition].map((player) => [player.id, player]),
  );

  return group.playerIds.flatMap((id) => {
    const player = sourceById.get(id);
    if (!player) {
      throw new Error(
        `Fonte improvisada ${id} não existe em ${group.sourcePosition}.`,
      );
    }
    if (occupiedNames.has(player.name)) return [];
    occupiedNames.add(player.name);
    return [adaptPlayer(player, targetPosition, group.sourcePosition, role)];
  });
}

export function createPlayerDrawGroups(
  naturalPools: NaturalPools,
): Record<Position, PlayerDrawGroups> {
  const groups = Object.fromEntries(
    POSITIONS.map((position) => {
      const natural = naturalPools[position];
      const occupiedNames = new Set(natural.map((player) => player.name));
      const rules = SOURCE_POSITION_RULES[position];
      const primary = createRolePool(
        naturalPools,
        position,
        "primary",
        rules.primary,
        occupiedNames,
      );
      const alternative = createRolePool(
        naturalPools,
        position,
        "alternative",
        rules.alternative,
        occupiedNames,
      );

      return [position, { natural, primary, alternative }];
    }),
  ) as Record<Position, PlayerDrawGroups>;

  const weightTotal = Object.values(SOURCE_ROLE_WEIGHTS).reduce(
    (total, weight) => total + weight,
    0,
  );
  if (Math.abs(weightTotal - 1) > Number.EPSILON) {
    throw new Error(`Pesos de origem somam ${weightTotal}; esperado: 1.`);
  }

  const adapted = POSITIONS.flatMap((position) => [
    ...groups[position].primary,
    ...groups[position].alternative,
  ]);
  const adaptedValues = adapted.flatMap((player) =>
    Object.values(player.attributes),
  );
  const rateAtLeast = (minimum: number) =>
    adaptedValues.filter((value) => value >= minimum).length /
    adaptedValues.length;

  if (adapted.some((player) => Object.keys(player.attributes).length !== 12)) {
    throw new Error("Há variante improvisada sem exatamente 12 atributos.");
  }
  if (
    adaptedValues.some(
      (value) => !Number.isInteger(value) || value < 35 || value > 97,
    )
  ) {
    throw new Error("Há nota improvisada fora do intervalo inteiro 35–97.");
  }
  if (rateAtLeast(90) >= 0.08 || rateAtLeast(94) >= 0.02) {
    throw new Error("As variantes improvisadas ultrapassaram a régua de notas.");
  }

  return groups;
}
