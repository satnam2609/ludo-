import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [NgClass,NgFor],
  templateUrl: 'home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  constructor() {}

  @Input({ required: true }) color: 'red' | 'yellow' | 'green' | 'blue' = 'red';
}
