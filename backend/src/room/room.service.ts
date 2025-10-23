import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Room, Player } from 'src/game/game.types';

@Injectable()
export class RoomService {
  private rooms: Map<string, Room> = new Map();

  private readonly colors = ['red', 'green', 'yellow', 'blue'] as const;

  createRoom(host: Player, requestedId?: string): Room {
    const id = (requestedId || randomUUID().slice(0, 6)).toUpperCase();
    if (this.rooms.has(id)) throw new Error('Room ID already exists');
    const room: Room = { id, players: [{ ...host }] };
    this.rooms.set(id, room);
    return room;
  }

  joinRoom(roomId: string, player: Player): Room | null {
    const room = this.rooms.get(roomId);
    if (!room) return null;
    if (room.players.length >= 4) return null;
    if (room.players.find((p) => p.id === player.id)) return room;
    room.players.push({ ...player });
    return room;
  }

  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  removePlayerFromRoom(roomId: string, playerId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    room.players = room.players.filter((p) => p.id !== playerId);
    if (room.players.length === 0) this.rooms.delete(roomId);
  }

  assignColors(room: Room) {
    for (let i = 0; i < room.players.length; i++) {
      room.players[i].color = this.colors[i];
    }
  }

  resetGame(room: Room) {
    delete room.gameState;
  }
}
