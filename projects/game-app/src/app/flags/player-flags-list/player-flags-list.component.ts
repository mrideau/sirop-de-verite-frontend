import { Component, inject } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { AppService } from '../../app.service';
import { Player } from '../../app.models';

@Component({
  selector: 'app-player-flags-list',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './player-flags-list.component.html',
  styleUrl: './player-flags-list.component.scss',
})
export class PlayerFlagsListComponent {
  private readonly _appService: AppService = inject(AppService);

  protected players = this._appService.players;

  togglePlayer(player: Player): void {
    player.noAlcohol = !player.noAlcohol;
  }
}
