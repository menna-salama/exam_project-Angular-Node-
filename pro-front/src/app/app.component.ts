import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule], // Import HeaderComponent and RouterOutlet
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'exam-system';
}
