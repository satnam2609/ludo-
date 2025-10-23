export type Color = 'red' | 'blue' | 'green' | 'yellow';

export interface Player {
  id: string;
  name?: string;
  color?: Color;
}

export interface GameState {
  currentTurn: string;
  positions: Record<string, number[]>;
  diceValue: number;
  isFinished: boolean;
}

export interface Room {
  id: string;
  players: Player[];
  gameState?: GameState;
}
