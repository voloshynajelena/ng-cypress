import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export const API_URL = 'https://api-modo-418554153a21.herokuapp.com';

export const API_ENDPOINTS = {
  main: '/',
  user: '/user',
  login: '/auth/login',
};

export interface UserData {
  id: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'token';
  private apiUrl = `${API_URL}${API_ENDPOINTS.login}`; // URL вашего API

  constructor(private http: HttpClient) {}

  login(login: string, pass: string): Observable<UserData> {
    return this.http.get<UserData>(this.apiUrl, { params: { login, pass }}).pipe(
      tap((response) => this.storeToken(response?.token))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
