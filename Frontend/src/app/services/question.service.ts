import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Question } from '../models/question.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getQuestions(examId: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/questions/${examId}/allQuestions`);
  }

  createQuestion(examId: string, question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/questions/${examId}/addQuestion`, question);
  }

  updateQuestion(examId: string, questionId: string, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.apiUrl}/questions/${examId}/question/${questionId}`, question);
  }

  deleteQuestion(examId: string, questionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/questions/${examId}/question/${questionId}`);
  }
}
