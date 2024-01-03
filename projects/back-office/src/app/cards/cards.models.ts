import { Paginated } from '@sirop-de-verite-shared';

export interface CardData {
  name: string;
  content: string;
  flags: string[];
  deck: number;
}

export type Card = CardData & { id: number };

export type Cards = Card[];

export type PaginatedCards = Paginated<Card>;
