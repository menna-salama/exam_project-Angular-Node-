import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

interface Exam {
  _id: string;
  title: string;
  questions?: number; 
  duration: number;
}

@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  exams: Exam[] = []; 
  newExam: Partial<Exam> = { title: '', questions: 0, duration: 0 }; 
  selectedExam: Exam | null = null;
  showCreateForm: boolean = false;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      this.apiService.getExams(token).subscribe(
        (response: { status: string; data: Exam[] }) => { 
          if (response.status === 'success' && response.data) {
            this.exams = response.data.map((exam: Exam) => ({
              _id: exam._id,
              title: exam.title,
              questions: exam.questions || 0,
              duration: exam.duration
            }));
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

  createExam() {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.createExam(this.newExam, token).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.newExam = { title: '', questions: 0, duration: 0 };
            this.showCreateForm = false;
            this.loadExams();
          }
        },
        (error: any) => {
          console.error('Error creating exam:', error);
          this.errorMessage = 'Failed to create exam.';
        }
      );
    }
  }

  editExam(exam: Exam) {
    this.selectedExam = { ...exam };
    this.showCreateForm = false;
  }

  updateExam() {
    const token = localStorage.getItem('token');
    if (token && this.selectedExam && this.selectedExam._id) {
      this.apiService.updateExam(this.selectedExam._id, {
        title: this.selectedExam.title,
        questions: this.selectedExam.questions,
        duration: this.selectedExam.duration
      }, token).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.selectedExam = null;
            this.loadExams();
          }
        },
        (error: any) => {
          console.error('Error updating exam:', error);
          this.errorMessage = 'Failed to update exam.';
        }
      );
    }
  }

  deleteExam(id: string) {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.deleteExam(id, token).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.loadExams();
          }
        },
        (error: any) => {
          console.error('Error deleting exam:', error);
          this.errorMessage = 'Failed to delete exam.';
        }
      );
    }
  }

  cancelEdit() {
    this.selectedExam = null;
    this.showCreateForm = false;
  }

  getIcon(title: string): string {
    const lower = title.toLowerCase();
    if (lower.includes('math')) return '📝';
    if (lower.includes('physics')) return '⚗️';
    if (lower.includes('history')) return '📜';
    return '📘';
  }
}