import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Question } from '../../models/question';
import { Exam } from '../../models/exam';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-list',
  standalone: true,
  templateUrl: './question-list.component.html',
  imports: [FormsModule, CommonModule],
})
export class QuestionListComponent implements OnInit {
  examId: string = '';
  currentExam: Exam | undefined;
  questions: Question[] = [];

  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
    this.examService.getExamById(this.examId).subscribe((exam) => {
      this.currentExam = exam;
    });
    this.examService.getQuestionsByExamId(this.examId).subscribe({
      next: (questions) => {
        this.questions = questions || [];
        if (this.questions.length === 0) {
          console.log('No questions found for this exam');
        }
      },
      error: (err) => {
        this.questions = [];
      },
    });
  }

  navigateToAddQuestion(): void {
    this.router.navigate(['/exams', this.examId, 'questions', 'add']);
  }

  navigateToEditQuestion(questionId: string | undefined): void {
    if (!questionId) {
      console.error('Cannot navigate to edit: Question ID is undefined');
      return;
    }
    this.router.navigate([
      '/exams',
      this.examId,
      'questions',
      'edit',
      questionId,
    ]);
  }

  deleteQuestion(questionId: string | undefined): void {
    if (!questionId) {
      console.error('Cannot delete question: ID is undefined');
      return;
    }

    if (confirm('Are you sure you want to delete this question?')) {
      this.examService.deleteQuestion(questionId).subscribe({
        next: () => {
          this.questions = this.questions.filter((q) => q._id !== questionId);
        },
        error: (err) => {
          console.error('Error deleting question:', err);
          alert('Failed to delete question: ' + err.message);
        },
      });
    }
  }
}
