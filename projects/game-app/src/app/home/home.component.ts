import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { JsonPipe } from '@angular/common';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    FormlyModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatInputModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected readonly appService: AppService = inject(AppService);

  protected playerName = '';

  protected players = this.appService.players;

  addPlayer(playerName: string): void {
    if (playerName.length === 0) {
      return;
    }
    this.appService.players.push({ name: playerName, noAlcohol: false });
    this.playerName = '';
  }

  deletePlayer(playerIndex: number): void {
    this.appService.players.splice(playerIndex, 1);
  }
}
