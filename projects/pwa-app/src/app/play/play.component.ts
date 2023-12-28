import { AfterViewInit, Component, inject } from '@angular/core';
import { CardsService } from './cards.service';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { AppService } from '../app.service';
import { AsyncPipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Player } from '../app.models';
import { CardComponent } from './card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Card } from '@sirop-de-verite-shared';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    CardComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    UpperCasePipe,
  ],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements AfterViewInit {
  private readonly _appService: AppService = inject(AppService);
  private readonly _cardsService: CardsService = inject(CardsService);

  protected readonly $currentPlayer: Subject<Player> = new Subject<Player>();
  protected readonly $cards = this.$currentPlayer.pipe(
    debounceTime(150),
    switchMap((player: Player) => {
      return this._cardsService.randomCards$(
        this._appService.selectedDecks,
        player.noAlcohol,
      );
    }),
  );

  ngAfterViewInit(): void {
    this.update();
  }

  update(): void {
    const randomPlayerIndex = Math.floor(
      Math.random() * this._appService.players.length,
    );
    const randomPlayer: Player = this._appService.players[randomPlayerIndex];
    this.$currentPlayer.next(randomPlayer);
  }

  selectCard(card: Card): void {
    this._cardsService.saveChoice(card.id).subscribe();
    this.update();
  }
}
