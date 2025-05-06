import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ExamListComponent } from './pages/exam-list/exam-list.component';
import { ExamFormComponent } from './pages/exam-form/exam-form.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { QuestionFormComponent } from './pages/question-form/question-form.component';
import { StudentResultsComponent } from './pages/result-list/result-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  { path: 'exams', component: ExamListComponent, canActivate: [AuthGuard] },
  { path: 'exams/add', component: ExamFormComponent, canActivate: [AuthGuard] },
  {
    path: 'exams/edit/:id',
    component: ExamFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exams/:examId/questions',
    component: QuestionListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exams/:examId/questions/add',
    component: QuestionFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exams/:examId/questions/edit/:id',
    component: QuestionFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'results',
    component: StudentResultsComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
