import { Player } from "./player";

export interface GameState {
  currentTurn: string;
  positions: Record<string, number[]>;
  diceValue: number;
  isFinished: boolean;
}
