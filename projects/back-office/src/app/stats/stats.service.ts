import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stats } from './stats.models';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  getStats$(): Observable<Stats> {
    return this._httpClient.get<Stats>('/api/choices/');
  }
}
