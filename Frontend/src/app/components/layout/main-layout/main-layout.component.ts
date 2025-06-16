import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  userRole: string = ''; 

  constructor(
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getRole() || '';
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}