import { CanMatchFn, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DecksComponent } from './decks/decks.component';
import { PlayComponent } from './play/play.component';
import { AppService } from './app.service';
import { inject } from '@angular/core';
import { FlagsComponent } from './flags/flags.component';
import { MatSnackBar } from '@angular/material/snack-bar';

const hasDecks: CanMatchFn = () => {
  const appService: AppService = inject(AppService);
  const snackBar: MatSnackBar = inject(MatSnackBar);
  if (appService.selectedDecks.length > 0) {
    return true;
  }
  snackBar.open('Il faut au minimum séléctionner un deck.', 'OK');
  return false;
};

const hasPlayers: CanMatchFn = () => {
  const appService: AppService = inject(AppService);
  const snackBar: MatSnackBar = inject(MatSnackBar);
  if (appService.players.length > 1) {
    return true;
  }
  snackBar.open('Il faut au minimum 2 joueurs.', 'OK');
  return false;
};

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'decks',
    component: DecksComponent,
    canMatch: [hasPlayers],
  },
  {
    path: 'flags',
    component: FlagsComponent,
    canMatch: [hasDecks, hasPlayers],
  },
  {
    path: 'play',
    component: PlayComponent,
    canMatch: [hasDecks, hasPlayers],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
