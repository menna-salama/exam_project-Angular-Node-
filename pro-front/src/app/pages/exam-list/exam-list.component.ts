import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Exam } from '../../models/exam';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css'],
})
export class ExamListComponent implements OnInit {
  exams: Exam[] = [];
  errorMessage: string | null = null; 

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.errorMessage = null; 
    this.examService.getExams().subscribe({
      next: (exams: Exam[]) => {
        this.exams = exams;
        if (!exams.length) {
          this.errorMessage = 'No exams available in the database.';
        }
      },
      error: (err) => {
        this.exams = [];
        this.errorMessage = 'Failed to load exams from the server. Please try again later.';
        if (err.status === 401) {
          this.errorMessage = 'Authentication error. Please log in again.';
        } else if (err.status === 404) {
          this.errorMessage = 'Exams endpoint not found. Please contact the administrator.';
        }
      },
    });
  }

  deleteExam(id?: string): void {
    if (id && confirm('Are you sure you want to delete this exam?')) {
      this.examService.deleteExam(id).subscribe({
        next: () => {
          this.loadExams();  
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete exam: ' + err.message;
        },
      });
    } 
  }
}