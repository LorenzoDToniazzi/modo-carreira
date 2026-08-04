import { readFileSync } from "node:fs";
import { createServer } from "vite";

const pools = [
  {
    position: "ATA",
    file: "../src/game/data/strikers.ts",
    minimum: 130,
    minimumByRarity: { epic: 18, rare: 30, uncommon: 35 },
  },
  {
    position: "PON",
    file: "../src/game/data/wingers.ts",
    minimum: 90,
    minimumByRarity: { epic: 18, rare: 25, uncommon: 25 },
  },
  {
    position: "MEI",
    file: "../src/game/data/midfielders.ts",
    minimum: 90,
    minimumByRarity: { epic: 18, rare: 22, uncommon: 25 },
  },
  {
    position: "VOL",
    file: "../src/game/data/defensive-midfielders.ts",
    minimum: 90,
    minimumByRarity: { epic: 17, rare: 25, uncommon: 28 },
  },
  {
    position: "LAT",
    file: "../src/game/data/fullbacks.ts",
    minimum: 90,
    minimumByRarity: { epic: 15, rare: 28, uncommon: 25 },
  },
  {
    position: "ZAG",
    file: "../src/game/data/defenders.ts",
    minimum: 90,
    minimumByRarity: { epic: 20, rare: 26, uncommon: 22 },
  },
  {
    position: "GOL",
    file: "../src/game/data/goalkeepers.ts",
    minimum: 90,
    minimumByRarity: { epic: 19, rare: 25, uncommon: 27 },
  },
];

const rowPattern =
  /^\s*\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"(king|legend|epic|rare|uncommon|common)",\s*\[([^\]]+)\],\s*"([^"]+)"\],?/gm;

const failures = [];
const allRows = [];
const expectedRarityWeights = {
  king: 0.001,
  legend: 0.053,
  epic: 0.045,
  rare: 0.25,
  uncommon: 0.4,
  common: 0.251,
};
const expectedDevelopmentConstants = {
  MIN_STARTING_PERCENT: 0.65,
  MAX_STARTING_PERCENT: 0.7,
  MIN_POTENTIAL_GROWTH_PERCENT: 0.1,
  MAX_POTENTIAL_GROWTH_PERCENT: 0.15,
};

const positionWeights = {
  ATA: [0.08, 0.18, 0.07, 0.08, 0.02, 0.08, 0.14, 0.2, 0.15],
  PON: [0.15, 0.1, 0.1, 0.15, 0.03, 0.07, 0.12, 0.1, 0.18],
  MEI: [0.05, 0.08, 0.16, 0.12, 0.05, 0.06, 0.19, 0.13, 0.16],
  VOL: [0.05, 0.03, 0.13, 0.07, 0.16, 0.12, 0.15, 0.15, 0.14],
  LAT: [0.13, 0.03, 0.1, 0.07, 0.13, 0.09, 0.15, 0.15, 0.15],
  ZAG: [0.08, 0.01, 0.07, 0.03, 0.21, 0.15, 0.15, 0.16, 0.14],
  GOL: [0.2, 0.1, 0.1, 0.15, 0.08, 0.12, 0.2, 0.05],
};

const positionAttributeKeys = {
  ATA: ["speed", "shooting", "passing", "dribbling", "defending", "physical", "offensiveAerial", "boxPositioning", "feint"],
  PON: ["speed", "shooting", "passing", "dribbling", "defending", "physical", "ballControl", "stamina", "feint"],
  MEI: ["speed", "shooting", "passing", "dribbling", "defending", "physical", "vision", "movement", "setPieces"],
  VOL: ["speed", "shooting", "passing", "dribbling", "defending", "physical", "tackling", "interceptions", "pressResistance"],
  LAT: ["speed", "shooting", "passing", "dribbling", "defending", "physical", "crossing", "stamina", "recovery"],
  ZAG: ["speed", "shooting", "passing", "dribbling", "defending", "physical", "aerial", "marking", "timing"],
  GOL: ["reflexes", "footwork", "jumping", "aerialControl", "penaltySaving", "lowExit", "goalkeepingPositioning", "height"],
};

const constantsSource = readFileSync(
  new URL("../src/game/constants.ts", import.meta.url),
  "utf8",
);
for (const [rarity, expected] of Object.entries(expectedRarityWeights)) {
  const match = constantsSource.match(
    new RegExp(`^\\s*${rarity}:\\s*([\\d.]+),?$`, "m"),
  );
  const actual = match ? Number(match[1]) : Number.NaN;
  if (actual !== expected) {
    failures.push(
      `peso de ${rarity}: esperado ${expected}; atual ${String(actual)}`,
    );
  }
}
for (const [constant, expected] of Object.entries(
  expectedDevelopmentConstants,
)) {
  const match = constantsSource.match(
    new RegExp(`^export const ${constant} = ([\\d.]+);$`, "m"),
  );
  const actual = match ? Number(match[1]) : Number.NaN;
  if (actual !== expected) {
    failures.push(
      `${constant}: esperado ${expected}; atual ${String(actual)}`,
    );
  }
}

for (const pool of pools) {
  const source = readFileSync(new URL(pool.file, import.meta.url), "utf8");
  const rows = [...source.matchAll(rowPattern)].map((match) => ({
    id: match[1],
    name: match[2],
    country: match[3],
    peak: match[4],
    rarity: match[5],
    values: match[6].split(",").map((value) => Number(value.trim())),
    note: match[7],
    position: pool.position,
    attributes: Object.fromEntries(
      positionAttributeKeys[pool.position].map((key, index) => [
        key,
        Number(match[6].split(",")[index].trim()),
      ]),
    ),
  }));
  const brazilianCount = rows.filter((row) => row.country.includes("Brasil")).length;

  if (rows.length < pool.minimum) {
    failures.push(
      `${pool.position} tem ${rows.length} jogadores; mínimo: ${pool.minimum}`,
    );
  }
  const expectedAttributeCount = pool.position === "GOL" ? 8 : 9;
  if (rows.some((row) => row.values.length !== expectedAttributeCount)) {
    failures.push(
      `${pool.position} possui jogador sem exatamente ${expectedAttributeCount} atributos`,
    );
  }
  if (
    rows.some(
      (row) =>
        row.peak.trim().length < 4 ||
        row.note.trim().length < 35 ||
        !/[A-Za-zÀ-ÿ]/.test(row.note),
    )
  ) {
    failures.push(
      `${pool.position} possui perfil sem auge ou justificativa individual suficiente`,
    );
  }
  if (brazilianCount / rows.length < 0.2) {
    failures.push(`${pool.position} tem menos de 20% de jogadores brasileiros`);
  }
  for (const [rarity, minimum] of Object.entries(pool.minimumByRarity)) {
    const count = rows.filter((row) => row.rarity === rarity).length;
    if (count < minimum) {
      failures.push(
        `${pool.position} tem ${count} jogadores ${rarity}; mínimo: ${minimum}`,
      );
    }
  }
  allRows.push(...rows);
  console.log(
    `${pool.position}: ${rows.length} jogadores · BR ${brazilianCount} (${(
      (brazilianCount / rows.length) *
      100
    ).toFixed(1)}%)`,
  );
}

const values = allRows.flatMap((row) => row.values);
const uniqueNames = new Set(allRows.map((row) => row.name));
const requiredBrazilianIcons = [
  "Pelé",
  "Neymar",
  "Romário",
  "Ronaldo Nazário",
  "Ronaldinho Gaúcho",
  "Zico",
  "Bebeto",
  "Roberto Dinamite",
  "Carlos Alberto Torres",
  "Renato Gaúcho",
  "Paulo Nunes",
  "Mário Jardel",
  "Juninho Capixaba",
  "Gilmar dos Santos Neves",
  "Rogério Ceni",
  "Marcos",
  "Cássio",
  "Emerson Leão",
  "Jairzinho",
  "Rivellino",
  "Sócrates",
  "Zito",
  "Djalma Santos",
  "Bellini",
];
const requiredRarities = new Map([
  ["GOL:Rogério Ceni", "legend"],
  ["GOL:Marcos", "legend"],
  ["GOL:Gilmar dos Santos Neves", "legend"],
  ["GOL:Cássio", "epic"],
  ["GOL:Emerson Leão", "epic"],
  ["PON:Jairzinho", "legend"],
  ["MEI:Rivellino", "legend"],
  ["MEI:Sócrates", "legend"],
  ["VOL:Zito", "legend"],
  ["LAT:Djalma Santos", "legend"],
  ["ZAG:Bellini", "legend"],
]);
const rateAtLeast = (minimum) =>
  values.filter((value) => value >= minimum).length / values.length;
const countAtLeast = (minimum) =>
  values.filter((value) => value >= minimum).length;

if (values.some((value) => !Number.isInteger(value) || value < 35 || value > 97)) {
  failures.push("há nota fora do intervalo inteiro 35–97");
}
if (rateAtLeast(90) >= 0.081) failures.push("notas 90+ atingem 8,1% ou mais");
if (rateAtLeast(94) >= 0.021) failures.push("notas 94+ atingem 2,1% ou mais");
if (rateAtLeast(97) >= 0.0045) failures.push("notas 97 atingem 0,45% ou mais");
for (const name of requiredBrazilianIcons) {
  if (!uniqueNames.has(name)) {
    failures.push(`ícone brasileiro obrigatório ausente: ${name}`);
  }
}
for (const [identity, expectedRarity] of requiredRarities) {
  const [position, name] = identity.split(":");
  const row = allRows.find(
    (candidate) => candidate.position === position && candidate.name === name,
  );
  if (!row) {
    failures.push(`perfil obrigatório ausente: ${identity}`);
  } else if (row.rarity !== expectedRarity) {
    failures.push(
      `${name} (${position}) deve ser ${expectedRarity}; atual: ${row.rarity}`,
    );
  }
}

const pele = allRows.find((row) => row.name === "Pelé" && row.position === "ATA");
const weightedOverall = (row) =>
  row.values.reduce(
    (total, value, index) =>
      total + value * positionWeights[row.position][index],
    0,
  );

if (!pele) {
  failures.push("Pelé não está disponível no pool de ATA");
} else {
  const strongestOther = Math.max(
    ...allRows.filter((row) => row !== pele).map(weightedOverall),
  );

  if (weightedOverall(pele) <= strongestOther) {
    failures.push(
      `Pelé não é o melhor perfil do banco: ${weightedOverall(pele).toFixed(2)} contra ${strongestOther.toFixed(2)}`,
    );
  }
  if (pele.rarity !== "king") {
    failures.push(`Pelé deve possuir raridade king; atual: ${pele.rarity}`);
  }
}
const kings = allRows.filter((row) => row.rarity === "king");
if (kings.length !== 1 || kings[0]?.name !== "Pelé") {
  failures.push("Pelé deve ser o único perfil da categoria Rei");
}

const profilesByNameAndPeak = new Map();
for (const row of allRows) {
  const identity = `${row.name}\u0000${row.peak}`;
  profilesByNameAndPeak.set(identity, [
    ...(profilesByNameAndPeak.get(identity) ?? []),
    row,
  ]);
}
for (const rows of profilesByNameAndPeak.values()) {
  if (rows.length < 2) continue;
  for (let leftIndex = 0; leftIndex < rows.length; leftIndex += 1) {
    for (
      let rightIndex = leftIndex + 1;
      rightIndex < rows.length;
      rightIndex += 1
    ) {
      const left = rows[leftIndex];
      const right = rows[rightIndex];
      const sharedKeys = Object.keys(left.attributes).filter(
        (key) => right.attributes[key] !== undefined,
      );
      for (const key of sharedKeys) {
        if (left.attributes[key] !== right.attributes[key]) {
          failures.push(
            `${left.name} (${left.peak}) diverge em ${key}: ${left.position} ${left.attributes[key]} × ${right.position} ${right.attributes[key]}`,
          );
        }
      }
    }
  }
}

for (const row of allRows) {
  const highCount = row.values.filter((value) => value >= 90).length;
  const historicalCount = row.values.filter((value) => value >= 94).length;
  const singularCount = row.values.filter((value) => value === 97).length;
  const isPele = row === pele;

  if (highCount > (isPele ? 8 : 6)) {
    failures.push(
      `${row.name} (${row.position}) tem ${highCount} notas 90+; máximo: ${isPele ? 8 : 6}`,
    );
  }
  if (historicalCount > (isPele ? 8 : 5)) {
    failures.push(
      `${row.name} (${row.position}) tem ${historicalCount} notas 94+; máximo: ${isPele ? 8 : 5}`,
    );
  }
  if (singularCount > (isPele ? 4 : 2)) {
    failures.push(
      `${row.name} (${row.position}) tem ${singularCount} notas 97; máximo: ${isPele ? 4 : 2}`,
    );
  }
}

for (const rarity of ["king", "legend", "epic", "rare", "uncommon", "common"]) {
  const rows = allRows.filter((row) => row.rarity === rarity);
  const mean =
    rows.reduce((total, row) => total + weightedOverall(row), 0) / rows.length;
  console.log(`${rarity}: overall ponderado médio ${mean.toFixed(2)}`);
}

console.log(`Total: ${allRows.length} perfis · ${uniqueNames.size} nomes distintos`);
console.log(`Notas: ${values.length}`);
console.log(`90+: ${countAtLeast(90)} (${(rateAtLeast(90) * 100).toFixed(2)}%)`);
console.log(`94+: ${countAtLeast(94)} (${(rateAtLeast(94) * 100).toFixed(2)}%)`);
console.log(`97: ${countAtLeast(97)} (${(rateAtLeast(97) * 100).toFixed(2)}%)`);

const expectedVariantCounts = {
  ATA: 47,
  PON: 16,
  MEI: 48,
  VOL: 15,
  LAT: 7,
  ZAG: 31,
  GOL: 0,
};
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { PLAYER_DRAW_GROUPS } = await server.ssrLoadModule(
    "/src/game/players.ts",
  );
  let variantCount = 0;
  for (const [position, groups] of Object.entries(PLAYER_DRAW_GROUPS)) {
    const variants = [...groups.primary, ...groups.alternative];
    variantCount += variants.length;
    if (variants.length !== expectedVariantCounts[position]) {
      failures.push(
        `${position} tem ${variants.length} improvisados; esperado: ${expectedVariantCounts[position]}`,
      );
    }
    if (
      position === "PON" &&
      variants.some(({ sourcePosition }) => sourcePosition === "LAT")
    ) {
      failures.push("LAT → PON voltou ao banco de improvisações");
    }
    for (const variant of variants) {
      const source = PLAYER_DRAW_GROUPS[variant.sourcePosition].natural.find(
        ({ id }) => id === variant.id.split("-from-")[1],
      );
      if (!source) {
        failures.push(`fonte natural ausente para ${variant.id}`);
        continue;
      }
      for (const key of [
        "speed",
        "shooting",
        "passing",
        "dribbling",
        "defending",
        "physical",
      ]) {
        if (variant.attributes[key] !== source.attributes[key]) {
          failures.push(
            `${variant.name} (${position}) alterou o global ${key}: fonte ${source.attributes[key]} × variante ${variant.attributes[key]}`,
          );
        }
      }
    }
  }
  console.log(`Improvisados explícitos: ${variantCount}`);
} catch (error) {
  failures.push(
    `carregamento real das improvisações falhou: ${
      error instanceof Error ? error.message : String(error)
    }`,
  );
} finally {
  await server.close();
}

if (failures.length) {
  console.error(`\nAuditoria reprovada:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Auditoria aprovada.");
