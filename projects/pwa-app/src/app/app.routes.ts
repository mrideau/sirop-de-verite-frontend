import { CanMatchFn, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DecksComponent } from './decks/decks.component';
import { PlayComponent } from './play/play.component';
import { AppService } from './app.service';
import { inject } from '@angular/core';
import { FlagsComponent } from './flags/flags.component';

const canPlay: CanMatchFn = () => {
  const appService: AppService = inject(AppService);
  return appService.players.length > 1 && appService.selectedDecks.length > 0;
};

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'decks',
    component: DecksComponent,
  },
  {
    path: 'flags',
    component: FlagsComponent,
  },
  {
    path: 'play',
    component: PlayComponent,
    canMatch: [canPlay],
  },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
