import { Component, inject, Input } from '@angular/core';
import { AppService } from '../../app.service';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Decks } from '@sirop-de-verite-shared';

@Component({
  selector: 'app-deck-list',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatChipsModule],
  templateUrl: './deck-list.component.html',
  styleUrl: './deck-list.component.scss',
})
export class DeckListComponent {
  private readonly _appService: AppService = inject(AppService);

  protected selectedDecks = this._appService.selectedDecks;

  @Input({ required: true })
  decks!: Decks;

  toggleDeck(deckId: number): void {
    if (this.selectedDecks.includes(deckId)) {
      this.selectedDecks.splice(this.selectedDecks.indexOf(deckId), 1);
    } else {
      this.selectedDecks.push(deckId);
    }
  }
}
