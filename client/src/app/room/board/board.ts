import { Component, OnInit } from '@angular/core';
import { Piece } from './piece.model';
import { NgClass } from '@angular/common';
import { HomeComponent } from '../../shared/home/home';
import { TrackComponent } from '../../shared/track/track';
import { SquareComponent } from '../../square/square';

@Component({
  selector: 'app-room-board',
  imports: [HomeComponent, HomeComponent, TrackComponent, SquareComponent],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  board: string[][] = Array(15)
    .fill(null)
    .map(() => Array(15).fill('path'));
  pieces: Piece[] = [];

  ngOnInit(): void {
    this.setupBoard();
    this.setupPieces();
  }

  setupBoard() {
    // Four home corners
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        this.board[i][j] = 'home-red'; // Top-left
        this.board[i][14 - j] = 'home-green'; // Top-right
        this.board[14 - i][j] = 'home-yellow'; // Bottom-left
        this.board[14 - i][14 - j] = 'home-blue'; // Bottom-right
      }
    }
    // Center
    for (let i = 6; i < 9; i++) {
      for (let j = 6; j < 9; j++) {
        this.board[i][j] = 'center';
      }
    }
    // Path cells already defaulted as 'path'
  }

  setupPieces() {
    // Place 4 pieces in each home corner
    this.pieces = [
      { id: 1, color: 'red', row: 1, col: 1 },
      { id: 2, color: 'red', row: 1, col: 4 },
      { id: 3, color: 'red', row: 4, col: 1 },
      { id: 4, color: 'red', row: 4, col: 4 },

      { id: 5, color: 'green', row: 1, col: 10 },
      { id: 6, color: 'green', row: 1, col: 13 },
      { id: 7, color: 'green', row: 4, col: 10 },
      { id: 8, color: 'green', row: 4, col: 13 },

      { id: 9, color: 'yellow', row: 10, col: 1 },
      { id: 10, color: 'yellow', row: 10, col: 4 },
      { id: 11, color: 'yellow', row: 13, col: 1 },
      { id: 12, color: 'yellow', row: 13, col: 4 },

      { id: 13, color: 'blue', row: 10, col: 10 },
      { id: 14, color: 'blue', row: 10, col: 13 },
      { id: 15, color: 'blue', row: 13, col: 10 },
      { id: 16, color: 'blue', row: 13, col: 13 },
    ];
  }

  getCellClass(row: number, col: number) {
    return 'cell ' + this.board[row][col];
  }

  getPiecesAtCell(row: number, col: number) {
    return this.pieces.filter((piece) => piece.row === row && piece.col === col);
  }
}
