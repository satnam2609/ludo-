import { GameState } from "./gameStatus";
import { Player } from "./player";

export interface Room {
  id: string;
  players: Player[];
  gameState?: GameState;
}
