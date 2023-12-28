import { CanMatchFn, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { inject } from '@angular/core';
import { AppService } from './app.service';
import { map } from 'rxjs';

const canAccessApp: CanMatchFn = () => {
  return inject(AppService).isAuthenticated$();
};

const canLogin: CanMatchFn = () => {
  return inject(AppService)
    .isAuthenticated$()
    .pipe(map((isAuthenticated: boolean) => !isAuthenticated));
};

export const routes: Routes = [
  {
    path: 'login',
    canMatch: [canLogin],
    loadComponent: () => import('./login/login.component'),
  },
  {
    path: '',
    component: AppLayoutComponent,
    canMatch: [canAccessApp],
    children: [
      {
        path: 'cards',
        loadChildren: () => import('./cards/cards.routes'),
      },
      {
        path: 'decks',
        loadChildren: () => import('./decks/decks.routes'),
      },
      {
        path: 'stats',
        loadChildren: () => import('./stats/stats.routes'),
      },
      { path: '**', redirectTo: 'cards', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
