import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/admin';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials: LoginRequest = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log('Login form submitted with:', this.credentials);
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        const token = localStorage.getItem('auth_token');
         
        this.router.navigate(['/dashboard']);
      }, });
  }
}
