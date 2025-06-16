import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/admin';  
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private tokenKey = 'auth_token'; 
  private currentUserSubject = new BehaviorSubject<any>(null);  
  public currentUser$ = this.currentUserSubject.asObservable();  

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();  
  }
  private loadToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.decodeToken(token);
        this.currentUserSubject.next(decodedToken);  
      } catch (error) {
        this.logout();  
      }
    }
  }
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decoded = atob(base64);
      return JSON.parse(decodeURIComponent(escape(decoded)));
    } catch (error) {
      console.error('Token decode failed:', error);
      throw new Error('Invalid token');
    }
  }
  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('Attempting login with:', credentials);
    const loginUrl = `${this.apiUrl}/admin/login`;
    console.log('Login URL:', loginUrl);
    return this.http.post<LoginResponse>(loginUrl, credentials).pipe(
      tap((response) => {
        let token: string | undefined;

        if (
          response?.data &&
          typeof response.data === 'object' &&
          response.data.token
        ) {
         token = response.data.token;
        } else if (response?.token) {
          token = response.token;
        } else if (response?.data && typeof response.data === 'string') {
          token = response.data;
        } else if (response?.accessToken) {
          token = response.accessToken;
        } else if (typeof response === 'string') {
          token = response;
        }

        if (token) {
          console.log(
            'Token received (first 10 chars):',
            token.substring(0, 10) + '...'
          );
          localStorage.setItem(this.tokenKey, token);  
          console.log('Token saved to localStorage with key:', this.tokenKey);
          this.loadToken();
        }  
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed: ' + error.message));
      })
    );
  }

 
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null); 
    this.router.navigate(['/login']);  
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthenticated(): boolean {
    return !!this.getToken();  
  }
  getUserId(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const decodedToken = this.decodeToken(token);
      return decodedToken.id || decodedToken._id || decodedToken.userId;
    } catch (error) {
      console.error('Error getting user ID:', error);
      return null;
    }
  }
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      this.router.navigate(['/login']);  
      throw new Error('No auth token found'); 
    }
    console.log('Token being sent from AuthService:', token);  
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token, 
    });
  }
  getExams(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/exam`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching exams:', error);
        return throwError(
          () => new Error('Failed to fetch exams: ' + error.message)
        );
      })
    );
  }
}
