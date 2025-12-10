import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/satyamdwivedi1',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/satyam-dwivedi-8130741b2',
      icon: 'linkedin',
    },
  ];

  onSocialClick(url: string): void {
    window.open(url, '_blank');
  }
}
