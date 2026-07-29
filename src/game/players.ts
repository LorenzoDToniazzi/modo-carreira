import { DEFENDERS } from "./data/defenders";
import { DEFENSIVE_MIDFIELDERS } from "./data/defensive-midfielders";
import { FULLBACKS } from "./data/fullbacks";
import { GOALKEEPERS } from "./data/goalkeepers";
import { MIDFIELDERS } from "./data/midfielders";
import { STRIKERS } from "./data/strikers";
import { WINGERS } from "./data/wingers";
import type { Position, SourcePlayer } from "./types";

export const PLAYER_POOLS: Record<Position, SourcePlayer[]> = {
  GOL: GOALKEEPERS,
  ZAG: DEFENDERS,
  LAT: FULLBACKS,
  VOL: DEFENSIVE_MIDFIELDERS,
  MEI: MIDFIELDERS,
  PON: WINGERS,
  ATA: STRIKERS,
};
