import { FormlyFieldConfig } from '@ngx-formly/core';
import { inject, Injectable } from '@angular/core';
import { DecksService } from '../decks/decks.service';
import { map } from 'rxjs';
import { Deck, Decks } from '../decks/decks.models';

@Injectable()
export class CardDeckPresetProvider {
  private readonly _decksService: DecksService = inject(DecksService);

  getConfiguration(): FormlyFieldConfig {
    return {
      key: 'deck',
      type: 'select',
      props: {
        required: true,
        label: 'Deck',
        options: this._decksService.getDecks$().pipe(
          map((decks: Decks) =>
            decks.map((deck: Deck) => ({
              value: deck.id,
              label: deck.name,
            })),
          ),
        ),
      },
    };
  }
}
