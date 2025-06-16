import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  exams: any[] = [];
  errorMessage: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.getExams(token).subscribe(
        (response: any) => {
          if (response.status === 'success' && response.data) {
            this.exams = response.data;
          } else {
            this.exams = [];
            this.errorMessage = 'No exams available.';
          }
        },
        (error: any) => {
          console.error('Error fetching exams:', error);
          this.errorMessage = 'Failed to load exams. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'You need to be logged in to view exams.';
    }
  }

  getIcon(title: string): string {
    const lower = title.toLowerCase();
    if (lower.includes('math')) return '📝';
    if (lower.includes('physics')) return '⚗️';
    if (lower.includes('history')) return '📜';
    return '📘';
  }
}