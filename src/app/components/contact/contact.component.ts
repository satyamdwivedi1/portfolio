import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContactInfo {
  type: string;
  label: string;
  value: string;
  link?: string;
  icon: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  contactInfo: ContactInfo[] = [
    {
      type: 'phone',
      label: 'Phone',
      value: '+91 9399874299',
      link: 'tel:+919399874299',
      icon: 'phone',
    },
    {
      type: 'email',
      label: 'Email',
      value: 'satyamkumardwivedi1103@gmail.com',
      link: 'mailto:satyamkumardwivedi1103@gmail.com',
      icon: 'email',
    },
    {
      type: 'location',
      label: 'Location',
      value: 'Singrauli, MP',
      icon: 'location',
    },
    {
      type: 'github',
      label: 'GitHub',
      value: 'github.com/satyamdwivedi1',
      link: 'https://github.com/satyamdwivedi1',
      icon: 'github',
    },
    {
      type: 'linkedin',
      label: 'LinkedIn',
      value: 'www.linkedin.com/in/satyam-dwivedi-8130741b2',
      link: 'https://www.linkedin.com/in/satyam-dwivedi-8130741b2',
      icon: 'linkedin',
    },
  ];

  onContactClick(contact: ContactInfo): void {
    if (contact.link) {
      window.open(contact.link, '_blank');
    }
  }
}
