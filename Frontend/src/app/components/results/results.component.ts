
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Result {
  _id: string;
  examId: string;
  score: number;
  totalQuestions: number;
  answers: { questionId: string; answer: string; correctAnswer: string; isCorrect: boolean }[];
}

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: Result[] = [];
  errorMessage: string = '';
  isAdmin: boolean = false;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.getRole() === 'admin';
    const endpoint = this.isAdmin ? '/results/admin' : '/results/me';
    this.apiService.getResults(endpoint).subscribe(
      (response: any) => {
        this.results = response.data || [];
      },
      (error) => {
        this.errorMessage = 'Failed to load results.';
        console.error(error);
      }
    );
  }
}
