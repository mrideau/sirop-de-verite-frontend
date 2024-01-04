import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from './login.models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  login$(credentials: Credentials): Observable<void> {
    return this._httpClient.post<void>('/api/auth/login/', credentials, {
      withCredentials: true,
    });
  }
}
