import { Component } from '@angular/core';
import { DiceComponent } from '../dice/dice';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-lobby',
  imports: [DiceComponent, NgClass],
  templateUrl: './lobby.html',
  styleUrl: './lobby.css',
})
export class Lobby {
  color: string = 'red';
}
