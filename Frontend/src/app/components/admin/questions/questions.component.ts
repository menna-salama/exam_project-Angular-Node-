// path: Frontend/src/app/components/admin/questions/questions.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Question } from '../../../models/question.model'; // Use shared model

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  examId: string = '';
  questions: Question[] = [];
  newQuestion: Question = { _id: '', examId: '', text: '', options: ['', '', '', ''], correctAnswer: '' };
  selectedQuestion: Question | null = null;
  showCreateForm: boolean = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {}

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestions(this.examId).subscribe(
      (data: Question[]) => {
        this.questions = data || [];
      },
      (error) => {
        this.errorMessage = 'Failed to load questions.';
        console.error(error);
      }
    );
  }

  createQuestion() {
    const questionToCreate: Question = { ...this.newQuestion, examId: this.examId, _id: '' };
    this.questionService.createQuestion(this.examId, questionToCreate).subscribe(
      (response: any) => {
        this.newQuestion = { _id: '', examId: '', text: '', options: ['', '', '', ''], correctAnswer: '' };
        this.showCreateForm = false;
        this.loadQuestions();
      },
      (error) => {
        this.errorMessage = 'Failed to create question.';
        console.error(error);
      }
    );
  }

  editQuestion(question: Question) {
    this.selectedQuestion = { ...question };
    this.showCreateForm = false;
  }

  updateQuestion() {
    if (this.selectedQuestion && this.selectedQuestion._id) {
      this.questionService.updateQuestion(this.examId, this.selectedQuestion._id, this.selectedQuestion).subscribe(
        (response: any) => {
          this.selectedQuestion = null;
          this.loadQuestions();
        },
        (error) => {
          this.errorMessage = 'Failed to update question.';
          console.error(error);
        }
      );
    }
  }

  deleteQuestion(id: string) {
    this.questionService.deleteQuestion(this.examId, id).subscribe(
      (response: any) => {
        this.loadQuestions();
      },
      (error) => {
        this.errorMessage = 'Failed to delete question.';
        console.error(error);
      }
    );
  }

  cancelEdit() {
    this.selectedQuestion = null;
    this.showCreateForm = false;
  }
}
