import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '@sirop-de-verite-shared';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  getUserInfo$(): Observable<User> {
    return this._httpClient.get<User>('api/auth/user/');
  }

  isAuthenticated$(): Observable<boolean> {
    return this.getUserInfo$().pipe(
      map((): boolean => true),
      catchError(() => {
        return of(false);
      }),
    );
  }

  logout$(): Observable<void> {
    return this._httpClient.post<void>('api/auth/logout/', {});
  }
}
