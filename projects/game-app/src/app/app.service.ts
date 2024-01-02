import { Injectable } from '@angular/core';
import { Player } from './app.models';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly players: Player[] = [];

  readonly selectedDecks: number[] = [];
}
