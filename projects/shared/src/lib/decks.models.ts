import { Paginated } from './paginated.model';

export interface DeckData {
  name: string;
  flags: string[];
  deck: number;
}

export type Deck = DeckData & { id: number };

export type Decks = Deck[];

export type PaginatedDecks = Paginated<Decks>;
