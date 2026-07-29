import { readFileSync } from "node:fs";

const source = readFileSync(
  new URL("../src/game/players.ts", import.meta.url),
  "utf8",
);

const rowPattern =
  /^\s*\["[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"(legend|epic|rare|uncommon|common)",\s*\[([^\]]+)\]/gm;
const rows = [...source.matchAll(rowPattern)].map((match) => ({
  rarity: match[1],
  values: match[2].split(",").map((value) => Number(value.trim())),
}));

const values = rows.flatMap((row) => row.values);
const rarityCounts = rows.reduce((counts, row) => {
  counts[row.rarity] = (counts[row.rarity] ?? 0) + 1;
  return counts;
}, {});

const rateAtLeast = (minimum) =>
  values.filter((value) => value >= minimum).length / values.length;
const countAtLeast = (minimum) =>
  values.filter((value) => value >= minimum).length;

const failures = [];

if (rows.length < 100) failures.push(`pool ATA tem apenas ${rows.length} jogadores`);
if (rows.some((row) => row.values.length !== 12)) {
  failures.push("há jogadores sem exatamente 12 atributos");
}
if (values.some((value) => !Number.isInteger(value) || value < 35 || value > 97)) {
  failures.push("há nota fora do intervalo inteiro 35–97");
}
if (rateAtLeast(90) >= 0.08) failures.push("notas 90+ atingem 8% ou mais");
if (rateAtLeast(94) >= 0.02) failures.push("notas 94+ atingem 2% ou mais");
if (rateAtLeast(97) >= 0.004) failures.push("notas 97 atingem 0,4% ou mais");
if ((rarityCounts.common ?? 0) + (rarityCounts.uncommon ?? 0) < rows.length * 0.6) {
  failures.push("comuns e incomuns representam menos de 60% do banco");
}

console.log(`ATA: ${rows.length} jogadores · ${values.length} notas`);
console.log(
  `Raridades: ${Object.entries(rarityCounts)
    .map(([rarity, count]) => `${rarity}=${count}`)
    .join(" · ")}`,
);
console.log(
  `90+: ${countAtLeast(90)} (${(rateAtLeast(90) * 100).toFixed(2)}%)`,
);
console.log(
  `94+: ${countAtLeast(94)} (${(rateAtLeast(94) * 100).toFixed(2)}%)`,
);
console.log(
  `97: ${countAtLeast(97)} (${(rateAtLeast(97) * 100).toFixed(2)}%)`,
);

if (failures.length) {
  console.error(`\nAuditoria reprovada:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log("Auditoria aprovada.");
