import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dice',
  imports: [NgIf, NgFor],
  templateUrl: './dice.html',
  styleUrls: ['./dice.css'],
})
export class DiceComponent {
  value = 1;
  rolling = false;

  rollDice() {
    if (this.rolling) return;
    this.rolling = true;

    const rollInterval = setInterval(() => {
      this.value = Math.floor(Math.random() * 6) + 1;
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      this.value = Math.floor(Math.random() * 6) + 1;
      this.rolling = false;
    }, 1000);
  }
}
