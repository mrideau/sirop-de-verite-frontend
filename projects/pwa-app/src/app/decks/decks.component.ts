import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Decks } from 'shared';
import { DecksService } from './decks.service';
import { AsyncPipe } from '@angular/common';
import { DeckListComponent } from './deck-list/deck-list.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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

  protected readonly decks$: Observable<Decks> = this._decksService.decks$();
}
