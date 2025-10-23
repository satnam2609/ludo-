import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import type { Player } from '../../../../common/player';
import type { Room } from '../../../../common/room';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;
  private rooms: Record<string, Room> = {};
  public currentRoom = signal<any>(null);
  public gameState = signal<any>(null);

  constructor() {
    this.socket = io('http://localhost:3000');

    // this.socket.on('roomCreated', (room) => {
    //   this.currentRoom.set(room);
    //   console.log('Room after roomCreation ', room);
    // });
    // this.socket.on('roomJoined', (room) => {
    //   this.currentRoom.set(room);
    //   console.log('Room after roomJoined ', room);
    // });
    // this.socket.on('diceRolled', (state) => this.gameState.set(state));
    // this.socket.on('gameUpdated', (state) => this.gameState.set(state));
  }

  createRoom(host: Player) {
    this.socket.emit('createRoom', host);
  }

  joinRoom(roomId: string, player: Player) {
    console.log('Join room data ', player);
    this.socket.emit('joinRoom', {
      roomId,
      player,
    });
  }

  on<T = any>(event: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(event, (data: T) => observer.next(data));
      return () => this.socket.off(event);
    });
  }
}
