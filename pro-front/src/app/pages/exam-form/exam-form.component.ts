import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { AuthService } from '../../services/auth.service';
import { Exam } from '../../models/exam';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './exam-form.component.html',
})
export class ExamFormComponent implements OnInit {
  examForm: Exam = {
    _id: '',
    title: '',
    description: '',
    duration: 60,
    active: true,
    created_by: '',
  };
  isEditing = false;

  constructor(
    private examService: ExamService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const userId = this.authService.getUserId();
    if (userId) {
      this.examForm.created_by = userId;
    }

    if (this.route.snapshot.routeConfig?.path?.includes('edit')) {
      this.isEditing = true;

      if (idParam) {
        setTimeout(() => {
          if (idParam.includes('/')) {
            const cleanId = idParam.replace(/\//g, '');
            this.examService.getExamById(cleanId).subscribe({
              next: (exam) => {
                if (exam) {
                  this.examForm = { ...exam };
                  if (!this.examForm.created_by) {
                    const userId = this.authService.getUserId();
                    if (userId) {
                      this.examForm.created_by = userId;
                    }
                  }
                } else {
                  this.router.navigate(['/exams']);
                }
              },
              error: (err) => {
                this.tryWithOriginalId(idParam);
              },
            });
          } else {
            this.tryWithOriginalId(idParam);
          }
        }, 100);
      } else {
        this.router.navigate(['/exams']);
      }
    } else {
      this.isEditing = false;
    }
  }
  private tryWithOriginalId(idParam: string): void {
    this.examService.getExamById(idParam).subscribe({
      next: (exam) => {
        if (exam) {
          this.examForm = { ...exam };
          if (!this.examForm.created_by) {
            const userId = this.authService.getUserId();
            if (userId) {
              this.examForm.created_by = userId;
            }
          }
        } else {
          this.router.navigate(['/exams']);
        }
      },
      error: (err) => {
        this.router.navigate(['/exams']);
      },
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (!this.examForm.created_by) {
        const userId = this.authService.getUserId();
        if (userId) {
          this.examForm.created_by = userId;
        }
      }

      this.examService.updateExam(this.examForm).subscribe({
        next: (response) => {
          this.router.navigate(['/exams']);
        },
      });
    } else {
      if (!this.examForm.created_by) {
        const userId = this.authService.getUserId();
        if (userId) {
          this.examForm.created_by = userId;
        }
      }
      const { _id, ...newExam } = this.examForm;
      this.examService.addExam(newExam).subscribe({
        next: (response) => {
          this.router.navigate(['/exams']);
        },
      });
    }
  }
  cancel(): void {
    this.router.navigate(['/exams']);
  }
}
