import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { Question } from '../../models/question';
import { Exam } from '../../models/exam';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-form',
  standalone: true,
  templateUrl: './question-form.component.html',
  imports: [FormsModule, CommonModule],
})
export class QuestionFormComponent implements OnInit {
  examId: string = '';
  questionId: string = '';
  currentExam: Exam | undefined;
  isEditing = false;

  questionForm: Question = {
    _id: '',
    exam_id: '',
    question: '',
    options: ['', ''],
    correct_answer: 0,
    points: 1,
  };

  constructor(
    private examService: ExamService,private router: Router,private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
    this.questionId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.examId) {
      this.router.navigate(['/exams']);
      return;
    }
    this.examService.getExamById(this.examId).subscribe({
      next: (exam) => {
        this.currentExam = exam;
      },
      error: (err) => {
        this.router.navigate(['/exams']);
      },
    });
    if (this.questionId) {
      this.isEditing = true;
      this.examService.getQuestionsByExamId(this.examId).subscribe({
        next: (questions) => {
          const question = questions.find((q) => q._id === this.questionId);
          if (question) {
            this.questionForm = { ...question };
          } else {
            this.router.navigate(['/exams', this.examId, 'questions']);
          }
        },
        error: (err) => {
          this.router.navigate(['/exams', this.examId, 'questions']);
        },
      });
    } else {
      this.questionForm.exam_id = this.examId;
    }
  }
  addOption(): void {
    this.questionForm.options.push('');
  }

  removeOption(index: number): void {
    if (this.questionForm.options.length > 2) {
      this.questionForm.options.splice(index, 1);
      if (index === this.questionForm.correct_answer) {
        this.questionForm.correct_answer = 0;
      } else if (index < this.questionForm.correct_answer) {
        this.questionForm.correct_answer--;
      }
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.questionForm.exam_id = this.examId;
      this.examService.updateQuestion(this.questionForm).subscribe({
        next: () => {
          this.router.navigate(['/exams', this.examId, 'questions']);
        },
      });
    } else {
      const { _id, ...newQuestion } = this.questionForm;
      this.examService.addQuestion(this.examId, newQuestion).subscribe({
        next: () => {
          this.router.navigate(['/exams', this.examId, 'questions']);
        },
        error: (err) => {
          alert('Error adding question: ' + err.message);
        },
      });
    }
  }
  cancel(): void {
    this.router.navigate(['/exams', this.examId, 'questions']);
  }
}
