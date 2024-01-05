import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  randomCards$(decks: number[], noAlcohol: boolean): Observable<any> {
    return this._httpClient.get<any>('api/cards/randoms/', {
      params: { decks: decks.join(','), noAlcohol },
    });
  }

  saveChoice(cardId: number): Observable<void> {
    return this._httpClient.post<void>('api/choices/', {
      card: cardId,
    });
  }
}
