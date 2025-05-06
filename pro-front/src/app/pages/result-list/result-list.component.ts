import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// عند تنفيذ الاتصال بالخدمة الفعلية، قم بإلغاء التعليق على السطر التالي
// import { ExamService } from '../../services/exam.service';

@Component({
  selector: 'app-students-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css'],
})
export class StudentResultsComponent implements OnInit {
  examResults: any[] = [];
  filteredResults: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  selectedResult: any = null;

  // عند تنفيذ الاتصال بالخدمة الفعلية، قم بإلغاء التعليق على السطر التالي
  // constructor(private examService: ExamService) {}

  constructor() {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    // استخدام بيانات وهمية بدلاً من الاتصال بالخدمة
    this.examResults = [
      {
        id: '1',
        userName: 'Ahmed Mohamed',
        examName: 'Math Exam',
        score: 85,
        totalMarks: 100,
        createdAt: new Date().toISOString(),
        questionCount: 10,
        duration: 60,
      },
      {
        id: '2',
        userName: 'Sara Ahmed',
        examName: 'Science Exam',
        score: 75,
        totalMarks: 100,
        createdAt: new Date().toISOString(),
        questionCount: 15,
        duration: 45,
      },
      {
        id: '3',
        userName: 'Mohamed Ali',
        examName: 'English Exam',
        score: 90,
        totalMarks: 100,
        createdAt: new Date().toISOString(),
        questionCount: 20,
        duration: 60,
      },
    ];

    this.filteredResults = [...this.examResults];
    this.loading = false;

    // عندما تكون الخدمة جاهزة، يمكن استخدام الكود التالي
    /*
    this.examService.getAllStudentResults().subscribe({
      next: (response: any) => {
        if (response.status === 'success') {
          this.examResults = response.data;
          this.filteredResults = [...this.examResults];
        }
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Failed to load results';
        this.loading = false;
      },
    });
    */
  }

  calculatePercentage(score: number, totalMarks: number): number {
    if (!totalMarks) return 0;
    return Math.round((score / totalMarks) * 100);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }

  viewDetails(result: any): void {
    this.selectedResult = result;
    const modalRef = document.getElementById('resultDetailsModal');
    if (modalRef) {
      modalRef.classList.add('show');
      modalRef.style.display = 'block';
      document.body.classList.add('modal-open');

      let backdrop = document.querySelector('.modal-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
      }
    }
  }

  closeModal(): void {
    const modalRef = document.getElementById('resultDetailsModal');
    if (modalRef) {
      modalRef.classList.remove('show');
      modalRef.style.display = 'none';
      document.body.classList.remove('modal-open');

      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }

  sortResults(_column: string): void {
    // يمكن تنفيذ منطق الترتيب هنا بناءً على العمود
    // استخدام _ قبل اسم المتغير لتجنب تحذير "المتغير معلن ولكن قيمته غير مستخدمة"
  }
}
