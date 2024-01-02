import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PlayerFlagsListComponent } from './player-flags-list/player-flags-list.component';

@Component({
  selector: 'app-flags',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatIconModule,
    PlayerFlagsListComponent,
  ],
  templateUrl: './flags.component.html',
  styleUrl: './flags.component.scss',
})
export class FlagsComponent {}
