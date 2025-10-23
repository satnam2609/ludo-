import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './services/socket.service';
import { FormsModule } from '@angular/forms';
import { PlayerService } from './services/player.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  providers: [SocketService, PlayerService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('client');
}
