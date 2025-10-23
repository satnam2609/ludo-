import { Component } from '@angular/core';
import { Board } from './board/board';
import { Lobby } from "./lobby/lobby";

@Component({
  selector: 'app-room',
  imports: [Board, Lobby],
  templateUrl: './room.html',
  styleUrl: './room.css',
})
export class RoomComponent {
  
}
