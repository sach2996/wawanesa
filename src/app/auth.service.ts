import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'https://your-auth-url.com/auth'; // Replace with your auth token URL
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  redirectToAuth(): void {
    window.location.href = this.authUrl;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.redirectToAuth();
  }
}
