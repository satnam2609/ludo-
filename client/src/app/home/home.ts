import { Component, inject } from '@angular/core';
import { FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SocketService } from '../services/socket.service';
import { PlayerService } from '../services/player.service';
import { Router } from '@angular/router';
import { Room } from '../../../../common/room';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  constructor(private socketService: SocketService, private playerService: PlayerService) {}

  name = '';
  roomId = '';

  router = inject(Router);

  createRoom() {
    const player = this.playerService.setPlayer(this.name);
    this.socketService.createRoom(player);

    this.socketService.on('roomCreated' + player.id).subscribe((roomRes: Room) => {
      this.router.navigate(['/room', roomRes.id.toLocaleLowerCase(), player.id]);
    });

    this.name = '';
    this.roomId = '';
  }

  joinRoom() {
    const player = this.playerService.setPlayer(this.name);
    this.socketService.joinRoom(this.roomId, player);

    this.socketService.on('roomJoined' + player.id).subscribe((roomRes: Room) => {
      this.router.navigate(['/room', roomRes.id.toLocaleLowerCase(), player.id]);
    });

    this.name = '';
    this.roomId = '';
  }
}
