import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Decks } from 'shared';

@Injectable({
  providedIn: 'root',
})
export class DecksService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  decks$(): Observable<Decks> {
    return this._httpClient.get<Decks>('/api/decks/');
  }
}
