import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Question } from '../models/question';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private apiUrl = 'http://localhost:3000/question';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getQuestionsByExam(examId: string): Observable<Question[]> {
    return this.http
      .get<{ questions: Question[] }>(`${this.apiUrl}/exam/${examId}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((response) => response.questions),
        catchError((error) =>
          throwError(
            () => new Error(error.error?.message || 'Failed to load questions')
          )
        )
      );
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http
      .post<{ message: string; question: Question }>(
        `${this.apiUrl}/add`,
        question,
        { headers: this.getHeaders() }
      )
      .pipe(
        map((response) => response.question),
        catchError((error) =>
          throwError(
            () => new Error(error.error?.message || 'Failed to create question')
          )
        )
      );
  }

  createManyQuestions(questions: Question[]): Observable<Question[]> {
    return this.http
      .post<{ message: string; questions: Question[] }>(
        `${this.apiUrl}/add-multiple`,
        questions,
        { headers: this.getHeaders() }
      )
      .pipe(
        map((response) => response.questions),
        catchError((error) =>
          throwError(
            () =>
              new Error(error.error?.message || 'Failed to create questions')
          )
        )
      );
  }

  updateQuestion(id: string, question: Question): Observable<Question> {
    return this.http
      .put<{ message: string; updated: Question }>(
        `${this.apiUrl}/update/${id}`,
        question,
        { headers: this.getHeaders() }
      )
      .pipe(
        map((response) => response.updated),
        catchError((error) =>
          throwError(
            () => new Error(error.error?.message || 'Failed to update question')
          )
        )
      );
  }

  deleteQuestion(id: string): Observable<void> {
    return this.http
      .delete<{ message: string }>(`${this.apiUrl}/delete/${id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map(() => undefined),
        catchError((error) =>
          throwError(
            () => new Error(error.error?.message || 'Failed to delete question')
          )
        )
      );
  }
}
