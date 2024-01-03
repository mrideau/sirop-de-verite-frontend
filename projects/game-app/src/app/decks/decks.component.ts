import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DecksService } from './decks.service';
import { AsyncPipe } from '@angular/common';
import { DeckListComponent } from './deck-list/deck-list.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Decks } from '@sirop-de-verite-shared';
import { AppService } from '../app.service';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [
    AsyncPipe,
    DeckListComponent,
    RouterLink,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss',
})
export class DecksComponent {
  private readonly _decksService: DecksService = inject(DecksService);
  private readonly _appService: AppService = inject(AppService);
  protected readonly selectedDecks = this._appService.selectedDecks;
  protected readonly decks$: Observable<Decks> = this._decksService.decks$();
}
