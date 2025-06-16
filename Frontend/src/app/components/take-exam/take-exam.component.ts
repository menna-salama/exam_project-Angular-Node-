import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service'
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
interface Question {
  _id?: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-take-exam',
  imports:[FormsModule,CommonModule],
  templateUrl: './take-exam.component.html',
  styleUrls: ['./take-exam.component.css']
})
export class TakeExamComponent implements OnInit {
  questions: Question[] = [];
  examId: string = '';
  answers: { [key: string]: string } = {};
  errorMessage: string = '';
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
    console.log("Exam ID:", this.examId);
    this.apiService.getAllQuestions(this.examId).subscribe(data => {
      if(!data){
        this.questions = [];
          this.errorMessage = 'No exams available.';
      }
      this.questions = data;
      console.log("Questions:", this.questions);
    });
  }
  selectAnswer(questionId: string, answer: string) {
    this.answers[questionId] = answer;
  }
}
