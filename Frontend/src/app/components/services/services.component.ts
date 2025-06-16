
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <h2 class="text-center mb-4">Our Services</h2>
      <p class="text-center">We provide a platform for creating, managing, and taking exams online.</p>
    </div>
  `
})
export class ServicesComponent {}
