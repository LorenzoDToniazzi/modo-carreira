import { createServer } from "vite";

function mulberry32(seed) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const originalRandom = Math.random;
Math.random = mulberry32(20260730);

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { calculateBasePotential, calculatePotential, drawPlayer } =
    await server.ssrLoadModule("/src/game/engine.ts");
  const { POSITION_CONFIGS } = await server.ssrLoadModule(
    "/src/game/constants.ts",
  );
  const { PLAYER_DRAW_GROUPS } = await server.ssrLoadModule(
    "/src/game/players.ts",
  );

  const positions = ["GOL", "ZAG", "LAT", "VOL", "MEI", "PON", "ATA"];
  const sampleCounts = { GOL: 5, ZAG: 5, LAT: 5, VOL: 5, MEI: 5, PON: 5, ATA: 10 };
  const summary = {};

  for (const position of positions) {
    const attributes = POSITION_CONFIGS[position].attributes;
    const saves = [];

    for (let saveIndex = 0; saveIndex < sampleCounts[position]; saveIndex += 1) {
      const remaining = new Set(attributes.map(({ key }) => key));
      const excludedIds = [];
      const picks = [];

      while (remaining.size) {
        const player = drawPlayer(position, excludedIds);
        const available = attributes
          .filter(({ key }) => remaining.has(key))
          .map(({ key, label, weight }) => ({
            key,
            label,
            weight,
            value: player.attributes[key],
          }))
          .filter(({ value }) => value !== undefined)
          .sort(
            (left, right) =>
              right.value + right.weight * 20 -
              (left.value + left.weight * 20),
          );
        const chosen = available[0];
        const startingPercent = 0.65 + Math.random() * 0.05;

        picks.push({
          attribute: chosen.label,
          player: player.name,
          rarity: player.rarity,
          role: player.sourceRole,
          source: chosen.value,
          current: Math.round(chosen.value * startingPercent),
          basePotential: calculateBasePotential(chosen.value),
          potential: calculatePotential(chosen.value),
        });
        remaining.delete(chosen.key);
        excludedIds.push(player.id);
      }

      saves.push({
        save: saveIndex + 1,
        kingOrLegend: picks.some(
          ({ rarity }) => rarity === "king" || rarity === "legend",
        ),
        improvised: picks.filter(({ role }) => role !== "natural").length,
        averageSource:
          picks.reduce((total, pick) => total + pick.source, 0) / picks.length,
        averageCurrent:
          picks.reduce((total, pick) => total + pick.current, 0) / picks.length,
        averageBasePotential:
          picks.reduce((total, pick) => total + pick.basePotential, 0) /
          picks.length,
        averagePotential:
          picks.reduce((total, pick) => total + pick.potential, 0) / picks.length,
        picks,
      });
    }

    let savesWithLegend = 0;
    let savesWithKingOrLegend = 0;
    const monteCarloSaves = 20_000;
    for (let index = 0; index < monteCarloSaves; index += 1) {
      const excludedIds = [];
      let foundLegend = false;
      let foundKingOrLegend = false;
      for (let draw = 0; draw < attributes.length; draw += 1) {
        const player = drawPlayer(position, excludedIds);
        excludedIds.push(player.id);
        if (player.rarity === "legend") foundLegend = true;
        if (player.rarity === "king" || player.rarity === "legend") {
          foundKingOrLegend = true;
        }
      }
      if (foundLegend) savesWithLegend += 1;
      if (foundKingOrLegend) savesWithKingOrLegend += 1;
    }

    summary[position] = {
      samples: saves,
      legendSaveRate: savesWithLegend / monteCarloSaves,
      kingOrLegendSaveRate: savesWithKingOrLegend / monteCarloSaves,
    };
  }

  for (const [position, result] of Object.entries(summary)) {
    const groups = PLAYER_DRAW_GROUPS[position];
    const variantCount = groups.primary.length + groups.alternative.length;
    console.log(
      `\n${position} · pool ${groups.natural.length} naturais + ${variantCount} improvisados · ` +
        `ao menos Lenda: ${(result.legendSaveRate * 100).toFixed(2)}% · ` +
        `Rei/Lenda: ${(result.kingOrLegendSaveRate * 100).toFixed(2)}%`,
    );
    for (const save of result.samples) {
      const notable = save.picks
        .filter(({ rarity }) => ["king", "legend", "epic"].includes(rarity))
        .map(({ player, attribute, source, rarity }) =>
          `${player} ${attribute} ${source} (${rarity})`,
        )
        .join("; ");
      console.log(
        `save ${String(save.save).padStart(2, "0")} · fonte ${save.averageSource.toFixed(1)} · ` +
          `início ${save.averageCurrent.toFixed(1)} · base ${save.averageBasePotential.toFixed(1)} · ` +
          `máx. ${save.averagePotential.toFixed(1)} · ` +
          `improvisados ${save.improvised} · ${notable || "sem Rei/Lenda/Épico"}`,
      );
    }
  }
} finally {
  Math.random = originalRandom;
  await server.close();
}
