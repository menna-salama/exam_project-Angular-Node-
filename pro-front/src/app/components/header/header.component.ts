import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
