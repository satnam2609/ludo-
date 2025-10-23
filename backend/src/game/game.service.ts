import { Injectable } from '@nestjs/common';
import type { Room, GameState, Color } from './game.types';

const START_INDEX: Record<Color, number> = {
  red: 0,
  green: 13,
  yellow: 26,
  blue: 39,
};

// const SAFE_SQUARES = new Set([0, 8, 13, 21, 26, 34, 39, 47]);

@Injectable()
export class GameService {
  initGameState(room: Room) {
    const positions: Record<string, number[]> = {};
    for (const p of room.players) {
      positions[p.id] = [-1, -1, -1, -1];
    }

    const gameState: GameState = {
      currentTurn: room.players[0].id,
      positions,
      diceValue: 0,
      isFinished: false,
    };

    room.gameState = gameState;
  }

  /**
   *
   * @param color
   * @param currentPos default position is -1
   * @param steps represents the diceValue
   * @returns the new position of the peice
   */
  moveForward(color: Color, currentPos: number, steps: number): number {
    if (currentPos === -1) {
      return steps === 6 ? START_INDEX[color] : -1;
    }

    if (currentPos >= 52) {
      // home entry
      const next = currentPos + steps;
      return next > 57 ? currentPos : Math.min(next, 57);
    }

    // game board movement
    const start = START_INDEX[color];
    const relativePos = (currentPos - start + 52) % 52;
    const newRelativePos = relativePos + steps;
    if (newRelativePos >= 52) {
      // into home entry
      const intoHome = newRelativePos - 52;
      const homePosition = 52 + intoHome;
      return Math.min(homePosition, 57);
    }

    // on board movement
    return (start + newRelativePos) % 52;
  }

  progressValue(color: Color, position: number): number {
    if (position === -1) return 0;
    if (position >= 52) {
      return 52 + (position - 52);
    }

    return (position - START_INDEX[color] + 52) % 52;
  }

  //   playServerTurn(room: Room, playerId: string) {
  //     if (!room.gameState) throw new Error(' Game not started');
  //     if (room.gameState.currentTurn !== playerId)
  //       throw new Error(' Not your turn');

  //     // roll dice on random number between 1 to 6
  //     const diceValue = Math.floor(Math.random() * 6) + 1;
  //     room.gameState.diceValue = diceValue;

  //     const positions = room.gameState.positions;
  //     const playerPieces = positions[playerId];

  //     const player = room.players.find((p) => p.id === playerId);
  //     if (!player || !player.color) throw new Error(' Player color not found');
  //   }

  // playServerTurn(diceValue: number, room: Room, playerId: string) {
  //   if (!room.gameState) throw new Error('Game not started');
  //   if (room.gameState.currentTurn !== playerId)
  //     throw new Error('Not your turn');

  //   room.gameState.diceValue = diceValue;

  //   const positions = room.gameState.positions;
  //   const piecePositions = positions[playerId];

  //   //
  // }
}
