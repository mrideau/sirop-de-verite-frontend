import { Paginated } from './paginated.model';

export interface DeckData {
  name: string;
}

export type Deck = DeckData & { id: number };

export type Decks = Deck[];
