import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../models/exam';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.examService.getExams().subscribe({
      next: (exams: Exam[]) => {
        this.exams = exams || [];
      },
      error: (err) => {
        console.error('Error loading exams:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else {
          alert('Failed to load exams: ' + err.message);
        }
      },
    });
  }

  navigateToAddExam(): void {
    this.router.navigate(['/exams/add']);
  }

  navigateToEditExam(examId: string | undefined): void {
    if (!examId) {
      return;
    }
    let cleanId = examId.replace(/\//g, '');
    this.router.navigate(['/exams/edit', cleanId]);
  }

  navigateToQuestions(examId: string | undefined): void {
    if (!examId) {
      return;
    }
    let cleanId = examId.replace(/\//g, '');
    this.router.navigate(['/exams', cleanId, 'questions']);
  }

  deleteExam(examId: string | undefined): void {
    if (!examId) {
      return;
    }
    let cleanId = examId.replace(/\//g, '');
    if (confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(cleanId).subscribe({
        next: () => {
          this.exams = this.exams.filter((exam) => exam._id !== examId);
        },
        error: (err) => {
          alert('Error deleting exam: ' + err.message);
        },
      });
    }
  }
}
