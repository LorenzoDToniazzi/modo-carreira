import { readFileSync } from "node:fs";

const pools = [
  { position: "ATA", file: "../src/game/players.ts", minimum: 100 },
  { position: "PON", file: "../src/game/data/wingers.ts", minimum: 50 },
  { position: "MEI", file: "../src/game/data/midfielders.ts", minimum: 50 },
  {
    position: "VOL",
    file: "../src/game/data/defensive-midfielders.ts",
    minimum: 50,
  },
  { position: "LAT", file: "../src/game/data/fullbacks.ts", minimum: 50 },
  { position: "ZAG", file: "../src/game/data/defenders.ts", minimum: 50 },
  { position: "GOL", file: "../src/game/data/goalkeepers.ts", minimum: 50 },
];

const rowPattern =
  /^\s*\["[^"]+",\s*"([^"]+)",\s*"([^"]+)",\s*"[^"]+",\s*"(legend|epic|rare|uncommon|common)",\s*\[([^\]]+)\]/gm;

const failures = [];
const allRows = [];

const rarityRules = {
  legend: {
    meanRange: [82, 89],
    maxPlayerAverage: 90,
    max85: 11,
    max90: 8,
    max94: 5,
    max97: 2,
  },
  epic: {
    meanRange: [78, 85],
    maxPlayerAverage: 89,
    max85: 10,
    max90: 7,
    max94: 3,
    max97: 0,
  },
  rare: {
    meanRange: [72, 79],
    maxPlayerAverage: 82,
    max85: 5,
    max90: 4,
    max94: 3,
    max97: 0,
  },
  uncommon: {
    meanRange: [65, 73],
    maxPlayerAverage: 78,
    max85: 2,
    max90: 1,
    max94: 0,
    max97: 0,
  },
  common: {
    meanRange: [59, 69],
    maxPlayerAverage: 70,
    max85: 1,
    max90: 0,
    max94: 0,
    max97: 0,
  },
};

for (const pool of pools) {
  const source = readFileSync(new URL(pool.file, import.meta.url), "utf8");
  const rows = [...source.matchAll(rowPattern)].map((match) => ({
    name: match[1],
    country: match[2],
    rarity: match[3],
    values: match[4].split(",").map((value) => Number(value.trim())),
    position: pool.position,
  }));
  const brazilianCount = rows.filter((row) => row.country.includes("Brasil")).length;
  const familiarRarities = rows.filter(
    (row) => row.rarity === "common" || row.rarity === "uncommon",
  ).length;

  if (rows.length < pool.minimum) {
    failures.push(
      `${pool.position} tem ${rows.length} jogadores; mínimo: ${pool.minimum}`,
    );
  }
  if (rows.some((row) => row.values.length !== 12)) {
    failures.push(`${pool.position} possui jogador sem exatamente 12 atributos`);
  }
  if (brazilianCount / rows.length < 0.2) {
    failures.push(`${pool.position} tem menos de 20% de jogadores brasileiros`);
  }
  if (familiarRarities / rows.length < 0.5) {
    failures.push(
      `${pool.position} tem menos de 50% de comuns e incomuns no banco`,
    );
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
];
const rateAtLeast = (minimum) =>
  values.filter((value) => value >= minimum).length / values.length;
const countAtLeast = (minimum) =>
  values.filter((value) => value >= minimum).length;

if (values.some((value) => !Number.isInteger(value) || value < 35 || value > 97)) {
  failures.push("há nota fora do intervalo inteiro 35–97");
}
if (rateAtLeast(90) >= 0.08) failures.push("notas 90+ atingem 8% ou mais");
if (rateAtLeast(94) >= 0.02) failures.push("notas 94+ atingem 2% ou mais");
if (rateAtLeast(97) >= 0.004) failures.push("notas 97 atingem 0,4% ou mais");
for (const name of requiredBrazilianIcons) {
  if (!uniqueNames.has(name)) {
    failures.push(`ícone brasileiro obrigatório ausente: ${name}`);
  }
}

for (const [rarity, rules] of Object.entries(rarityRules)) {
  const rows = allRows.filter((row) => row.rarity === rarity);
  const rarityValues = rows.flatMap((row) => row.values);
  const mean =
    rarityValues.reduce((total, value) => total + value, 0) /
    rarityValues.length;
  const [minimumMean, maximumMean] = rules.meanRange;

  if (mean < minimumMean || mean > maximumMean) {
    failures.push(
      `${rarity}: média ${mean.toFixed(2)} fora de ${minimumMean}–${maximumMean}`,
    );
  }

  for (const row of rows) {
    const playerAverage =
      row.values.reduce((total, value) => total + value, 0) / row.values.length;
    const counts = {
      85: row.values.filter((value) => value >= 85).length,
      90: row.values.filter((value) => value >= 90).length,
      94: row.values.filter((value) => value >= 94).length,
      97: row.values.filter((value) => value >= 97).length,
    };

    if (playerAverage > rules.maxPlayerAverage) {
      failures.push(
        `${row.name} (${row.position}) tem média ${playerAverage.toFixed(2)}; ` +
          `máximo de ${rarity}: ${rules.maxPlayerAverage}`,
      );
    }
    for (const threshold of [85, 90, 94, 97]) {
      const limit = rules[`max${threshold}`];
      if (counts[threshold] > limit) {
        failures.push(
          `${row.name} (${row.position}) tem ${counts[threshold]} notas ${threshold}+; ` +
            `máximo de ${rarity}: ${limit}`,
        );
      }
    }
  }

  console.log(`${rarity}: média ${mean.toFixed(2)}`);
}

console.log(`Total: ${allRows.length} perfis · ${uniqueNames.size} jogadores únicos`);
console.log(`Notas: ${values.length}`);
console.log(`90+: ${countAtLeast(90)} (${(rateAtLeast(90) * 100).toFixed(2)}%)`);
console.log(`94+: ${countAtLeast(94)} (${(rateAtLeast(94) * 100).toFixed(2)}%)`);
console.log(`97: ${countAtLeast(97)} (${(rateAtLeast(97) * 100).toFixed(2)}%)`);

if (failures.length) {
  console.error(`\nAuditoria reprovada:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Auditoria aprovada.");
