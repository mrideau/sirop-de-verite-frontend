import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Deck, DeckData, Decks } from './decks.models';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  getDecks$(): Observable<Decks> {
    return this._httpClient.get<Decks>('api/decks/');
  }

  createDeck$(data: DeckData): Observable<Deck> {
    return this._httpClient.post<Deck>('api/decks/', data);
  }

  updateDeck$(deckId: number, data: DeckData): Observable<Deck> {
    return this._httpClient.put<Deck>(`api/decks/${deckId}/`, data);
  }

  deleteDeck$(deckId: number): Observable<void> {
    return this._httpClient.delete<void>(`api/decks/${deckId}/`);
  }
}
