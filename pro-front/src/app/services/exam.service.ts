import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Exam } from '../models/exam';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private apiUrl = 'http://localhost:3000/exam';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', token);
      console.log(
        'Authorization header value:',
        token.substring(0, 10) + '...'
      );
    }
    return headers;
  }

  getExams(): Observable<Exam[]> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Authentication required'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const url = `${this.apiUrl}`;
    const options = { headers: headers };

    return this.http.get<any>(url, options).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response;
        } else if (
          response &&
          response.exams &&
          Array.isArray(response.exams)
        ) {
          return response.exams;
        } else if (response && response.data && Array.isArray(response.data)) {
          return response.data;
        } else if (
          response &&
          response.data &&
          response.data.exams &&
          Array.isArray(response.data.exams)
        ) {
          return response.data.exams;
        } else {
          return [];
        }
      }),
      catchError((error) => {
        return throwError(
          () =>
            new Error(
              'Failed to get exams: ' + (error.message || error.statusText)
            )
        );
      })
    );
  }

  getExamById(id: string): Observable<Exam> {
    let cleanId = id.replace(/\//g, '');
    const url = `${this.apiUrl}/${cleanId}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        if (response && response.exam) {
          return response.exam as Exam;
        } else if (response && response.data && response.data.exam) {
          return response.data.exam as Exam;
        } else {
          return response as Exam;
        }
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to get exam: ' + error.message)
        );
      })
    );
  }

  addExam(exam: Omit<Exam, '_id'>): Observable<Exam> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}`;
    return this.http.post<Exam>(url, exam, { headers }).pipe(
      map((response) => {
        return response as Exam;
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to add exam: ' + error.message)
        );
      })
    );
  }

  updateExam(exam: Exam): Observable<Exam> {
    const headers = this.getHeaders();

    if (!exam._id) {
      return throwError(() => new Error('Exam ID is required for update'));
    }
    const url = `${this.apiUrl}/${exam._id}`;
    return this.http.put<Exam>(url, exam, { headers }).pipe(
      map((response) => {
        return response as Exam;
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to update exam: ' + error.message)
        );
      })
    );
  }

  deleteExam(id: string): Observable<void> {
    let cleanId = id.replace(/\//g, '');
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Authentication required'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const url = `${this.apiUrl}/${cleanId}`;
    return this.http.delete<void>(url, { headers }).pipe(
      map(() => {
        return;
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to delete exam: ' + error.message)
        );
      })
    );
  }

  getQuestionsByExamId(examId: string): Observable<Question[]> {
    let cleanId = examId.replace(/\//g, '');
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Authentication required'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const url = `${this.apiUrl.replace('/exam', '/question')}/${cleanId}`;
    const options = { headers: headers };
    return this.http.get<any>(url, options).pipe(
      map((response) => {
        if (Array.isArray(response)) {
          return response as Question[];
        } else if (
          response &&
          response.questions &&
          Array.isArray(response.questions)
        ) {
          return response.questions as Question[];
        } else if (response && response.data && Array.isArray(response.data)) {
          return response.data as Question[];
        } else if (
          response &&
          response.data &&
          response.data.questions &&
          Array.isArray(response.data.questions)
        ) {
          return response.data.questions as Question[];
        } else {
          return [] as Question[];
        }
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to get questions: ' + error.message)
        );
      })
    );
  }

  getQuestionById(examId: string, questionId: string): Observable<Question> {
    let cleanExamId = examId.replace(/\//g, '');
    let cleanQuestionId = questionId.replace(/\//g, '');
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Authentication required'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const url = `${this.apiUrl.replace('/exam', '/question')}/${cleanExamId}`;
    return this.http.get<any>(url, { headers }).pipe(
      map((response) => {
        let questions: Question[] = [];
        if (Array.isArray(response)) {
          questions = response;
        } else if (
          response &&
          response.questions &&
          Array.isArray(response.questions)
        ) {
          questions = response.questions;
        } else if (response && response.data && Array.isArray(response.data)) {
          questions = response.data;
        } else if (
          response &&
          response.data &&
          response.data.questions &&
          Array.isArray(response.data.questions)
        ) {
          questions = response.data.questions;
        }
        const question = questions.find((q) => q._id === cleanQuestionId);
        if (!question) {
          throw new Error('Question not found');
        }
        return question as Question;
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to get question: ' + error.message)
        );
      })
    );
  }

  addQuestion(
    examId: string,
    question: Omit<Question, '_id'>
  ): Observable<Question> {
    let cleanId = examId.replace(/\//g, '');
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Authentication required'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const url = `${this.apiUrl.replace('/exam', '/question')}`;
    const options = { headers: headers };
    const questionWithExamId = {
      ...question,
      exam_id: cleanId,
    };

    return this.http.post<Question>(url, questionWithExamId, options).pipe(
      map((response) => {
        console.log('Add question response:', response);
        return response as Question;
      }),
      catchError((error) => {
        console.error('Error adding question:', error);
        const urlAlt = `${this.apiUrl}/questions`;
        console.log('Trying alternative URL for adding question (2):', urlAlt);
        return this.http
          .post<Question>(urlAlt, questionWithExamId, options)
          .pipe(
            map((response) => {
              console.log('Add question response (alternative URL):', response);
              return response as Question;
            }),
            catchError((secondError) => {
              console.error(
                'Error adding question (alternative URL):',
                secondError
              );
              return throwError(
                () => new Error('Failed to add question: ' + error.message)
              );
            })
          );
      })
    );
  }

  updateQuestion(question: Question): Observable<Question> {
    console.log('Updating question (original):', question);

    if (!question._id) {
      return throwError(() => new Error('Question ID is required for update'));
    }
    let cleanId = question._id;
    if (question._id.includes('/')) {
      console.warn('Question ID contains slashes, cleaning it:', question._id);
      cleanId = question._id.replace(/\//g, '');
    }
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('No token found, cannot update question');
      return throwError(() => new Error('Authentication required'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const questionWithCleanId = {
      ...question,
      _id: cleanId,
    };
    const url = `${this.apiUrl.replace('/exam', '/question')}/${cleanId}`;
    console.log('API URL for updating question (1):', url);
    const options = {
      headers: headers,
      withCredentials: false,
    };
    return this.http.put<Question>(url, questionWithCleanId, options).pipe(
      map((response) => {
        console.log('Update question response:', response);
        return response as Question;
      }),
      catchError((error) => {
        const urlAlt = `${this.apiUrl}/${question.exam_id}/questions/${cleanId}`;
        return this.http
          .put<Question>(urlAlt, questionWithCleanId, options)
          .pipe(
            map((response) => {
              return response as Question;
            }),
            catchError((secondError) => {
              return throwError(
                () => new Error('Failed to update question: ' + error.message)
              );
            })
          );
      })
    );
  }

  deleteQuestion(questionId: string): Observable<void> {
    let cleanId = questionId;
    if (questionId.includes('/')) {
      cleanId = questionId.replace(/\//g, '');
    }
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Authentication required'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });
    const url = `${this.apiUrl.replace('/exam', '/question')}/${cleanId}`;
    console.log('API URL for deleting question (1):', url);
    const options = {
      headers: headers,
      withCredentials: false,
    };

    return this.http.delete<void>(url, options).pipe(
      map(() => {
        console.log('Question deleted successfully');
        return;
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to delete question: ' + error.message)
        );
      })
    );
  }

  getAllStudentResults(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('Authentication required'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });

    // استخدام مسار API للحصول على نتائج الطلاب
    // هذا مسار مؤقت، يجب تحديثه بالمسار الصحيح عندما يكون متاحًا
    const url = `${this.apiUrl.replace('/exam', '/result')}`;
    const options = { headers: headers };

    return this.http.get<any>(url, options).pipe(
      map((response) => {
        // تعامل مع الاستجابة حسب هيكل البيانات المتوقع
        if (response && response.status === 'success') {
          return response;
        } else if (response && response.data) {
          return { status: 'success', data: response.data };
        } else if (Array.isArray(response)) {
          return { status: 'success', data: response };
        } else {
          return { status: 'success', data: [] };
        }
      }),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to get student results: ' + error.message)
        );
      })
    );
  }
}
