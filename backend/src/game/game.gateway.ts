import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { Player } from './game.types';
import { RoomService } from 'src/room/room.service';
// import { RoomService } from '../room/room.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class GameGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() playerData: Player,
  ) {
    const newRoom = this.roomService.createRoom(playerData);
    client.emit('roomCreated' + playerData.id, newRoom);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string; player: Player },
  ) {
    console.log('Join room data ', data);
    const room = this.roomService.joinRoom(data.roomId, data.player);
    if (room) {
      client.emit('roomJoined' + data.player.id, room);
    } else {
      client.emit('error', 'Unable to join room');
    }
  }

  @SubscribeMessage('room')
  handleRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
    console.log('Get room data');
    const room = this.roomService.getRoom(roomId);
    if (room) {
      client.emit('roomEvent', room);
    } else {
      client.emit('error' + roomId, ' Room not found');
    }
  }

  // @SubscribeMessage('')
}
