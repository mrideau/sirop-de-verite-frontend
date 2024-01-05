import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card, CardData, Cards } from './cards.models';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  getCards$(): Observable<Cards> {
    return this._httpClient.get<Cards>('api/cards/');
  }

  getCard$(cardId: number): Observable<Card> {
    return this._httpClient.get<Card>(`api/cards/${cardId}/`);
  }

  createCard$(data: CardData): Observable<Card> {
    return this._httpClient.post<Card>('api/cards/', data);
  }

  updateCard$(cardId: number, data: CardData): Observable<Card> {
    return this._httpClient.put<Card>(`api/cards/${cardId}/`, data);
  }

  deleteCard$(cardId: number): Observable<void> {
    return this._httpClient.delete<void>(`api/cards/${cardId}/`);
  }
}
