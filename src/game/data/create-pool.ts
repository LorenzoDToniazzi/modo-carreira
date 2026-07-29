import { POSITION_CONFIGS } from "../constants";
import type { Position, Rarity, SourcePlayer } from "../types";

export type RawPlayer = [
  id: string,
  name: string,
  country: string,
  peak: string,
  rarity: Rarity,
  values: number[],
  note: string,
];

export function createPool(position: Position, rows: RawPlayer[]): SourcePlayer[] {
  const keys = POSITION_CONFIGS[position].attributes.map(({ key }) => key);

  return rows.map(([id, name, country, peak, rarity, values, note]) => {
    if (values.length !== keys.length) {
      throw new Error(
        `${name} (${position}) possui ${values.length} notas; esperado: ${keys.length}.`,
      );
    }

    return {
      id: `${position.toLowerCase()}-${id}`,
      name,
      country,
      peak,
      positions: [position],
      rarity,
      attributes: Object.fromEntries(
        keys.map((key, index) => [key, values[index]]),
      ),
      note,
    };
  });
}
