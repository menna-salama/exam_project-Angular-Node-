import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { username: '', email: '', password: '', role: 'student' };
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit() {
    this.errorMessage = ''; 
    this.apiService.register(this.user).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          alert('Registration successful! Please login.');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Registration failed: Invalid response';
        }
      },
      (error: any) => {
        this.errorMessage = 'Error during registration: ' + (error.error?.message || 'Unknown error');
      }
    );
  }
}