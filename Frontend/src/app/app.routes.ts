import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ExamsComponent as AdminExamsComponent } from './components/admin/exams/exams.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
//import { ResultsComponent } from './components/results/results.component';
import { TakeExamComponent } from './components/take-exam/take-exam.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'exams', component: ExamsComponent },
      //{ path: 'results', component: ResultsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'admin/exams', component: AdminExamsComponent },
      { path: 'questions/:examId/allQuestions', component: TakeExamComponent }
      
    ]
  },
  { path: '**', redirectTo: '/login' }
];
