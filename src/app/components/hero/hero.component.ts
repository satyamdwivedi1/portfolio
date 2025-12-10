import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  name = 'Satyam Kumar Dwivedi';
  role = 'Full-stack Developer (Angular + .NET Core + Azure)';
  punchline = 'Building scalable, secure and user-centric web applications.';

  // Social and resume links
  resumeUrl = 'assets/file/SATYAMD-RESUME.pdf'; // You can update this with your actual resume URL
  githubUrl = 'https://github.com/satyamdwivedi1'; // Update with your GitHub
  linkedinUrl = 'https://www.linkedin.com/in/satyam-dwivedi-8130741b2'; // Update with your LinkedIn

  onViewResume() {
    window.open(this.resumeUrl, '_blank');
  }

  onViewGitHub() {
    window.open(this.githubUrl, '_blank');
  }

  onViewLinkedIn() {
    window.open(this.linkedinUrl, '_blank');
  }
}
