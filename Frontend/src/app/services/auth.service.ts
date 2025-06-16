import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;  

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role || 'user';
      } catch (e) {
        return 'user';
      }
    }
    return 'user';
  }

  updateProfile(updatedUserData: { userName: string; email: string }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<any>(`${this.apiUrl}/auth/update-profile`, updatedUserData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  
  changePassword(passwordData: { currentPassword: string; newPassword: string }): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put<any>(`${this.apiUrl}/auth/change-password`, passwordData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  

  getEmailFromToken(): string {
    const token = this.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email || '';
      } catch (e) {
        return '';
      }
    }
    return '';
  }

  getUserNameFromToken(): string {
    const token = this.getToken();
    if (!token) return 'User';

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.email ? payload.email.split('@')[0] : 'User';
    } catch (e) {
      return 'User';
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    localStorage.removeItem('username');
  }
}
