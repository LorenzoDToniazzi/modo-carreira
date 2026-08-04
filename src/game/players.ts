import { DEFENDERS } from "./data/defenders";
import { DEFENSIVE_MIDFIELDERS } from "./data/defensive-midfielders";
import { FULLBACKS } from "./data/fullbacks";
import { GOALKEEPERS } from "./data/goalkeepers";
import { MIDFIELDERS } from "./data/midfielders";
import { STRIKERS } from "./data/strikers";
import { WINGERS } from "./data/wingers";
import { createPlayerDrawGroups } from "./improvised";
import { POSITIONS } from "./types";
import type { Position, SourcePlayer } from "./types";

export const NATURAL_PLAYER_POOLS: Record<Position, SourcePlayer[]> = {
  GOL: GOALKEEPERS,
  ZAG: DEFENDERS,
  LAT: FULLBACKS,
  VOL: DEFENSIVE_MIDFIELDERS,
  MEI: MIDFIELDERS,
  PON: WINGERS,
  ATA: STRIKERS,
};

export const PLAYER_DRAW_GROUPS = createPlayerDrawGroups(NATURAL_PLAYER_POOLS);

export const PLAYER_POOLS = Object.fromEntries(
  POSITIONS.map((position) => {
    const groups = PLAYER_DRAW_GROUPS[position];
    return [
      position,
      [...groups.natural, ...groups.primary, ...groups.alternative],
    ];
  }),
) as Record<Position, SourcePlayer[]>;
