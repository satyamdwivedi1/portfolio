import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
  gradeType: 'CGPA' | 'Percentage';
  level: 'Bachelor' | 'Higher Secondary' | 'Secondary';
}

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  educationList: Education[] = [
    {
      id: 1,
      degree: 'B.E. in Computer Science Engineering',
      institution: 'Technocrats Institute of Technology',
      location: 'Bhopal',
      duration: '2017 – 2021',
      grade: '7.76',
      gradeType: 'CGPA',
      level: 'Bachelor',
    },
    {
      id: 2,
      degree: 'Higher Secondary (12th)',
      institution: 'Govt. Model School',
      location: 'Bhopal',
      duration: '2017',
      grade: '85%',
      gradeType: 'Percentage',
      level: 'Higher Secondary',
    },
  ];

  getEducationIcon(level: string): string {
    switch (level) {
      case 'Bachelor':
        return 'graduation';
      case 'Higher Secondary':
        return 'school';
      default:
        return 'education';
    }
  }
}
