import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      title: 'Digital Logistics Tracker',
      description:
        'A comprehensive digital logistics platform with real-time tracking capabilities, customs automation, and OCR verification for enhanced accuracy and efficiency.',
      technologies: ['Angular', '.NET Core', 'PostgreSQL', 'Azure'],
      highlights: [
        'Real-time tracking system',
        'Customs automation workflows',
        'OCR verification integration',
        'Improved accuracy by 40%',
      ],
      category: 'Full-Stack',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Octopus Cloud Admin Panel',
      description:
        'Scalable admin panel for managing users, organizations, and hardware with advanced state management and reusable component architecture.',
      technologies: ['Angular', 'NgRx', '.NET Core'],
      highlights: [
        'User & organization management',
        'Scalable state architecture',
        'Reusable component library',
        'Hardware credential management',
      ],
      category: 'Full-Stack',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Site Management Platform',
      description:
        'Comprehensive site management platform serving 1,000+ users with automated job creation, customer tracking, and integrated payment workflows.',
      technologies: ['Angular', 'Bootstrap'],
      highlights: [
        'Job automation system',
        'Customer management tools',
        'Payment workflow integration',
        'Reduced manual work by 50%',
      ],
      category: 'Frontend',
      status: 'completed',
    },
  ];

  getProjectIcon(category: string): string {
    switch (category) {
      case 'Full-Stack':
        return 'fullstack';
      case 'Frontend':
        return 'frontend';
      case 'Backend':
        return 'backend';
      default:
        return 'project';
    }
  }

  getTechColor(tech: string): string {
    const techColors: { [key: string]: string } = {
      Angular: '#dd0031',
      '.NET Core': '#512bd4',
      PostgreSQL: '#336791',
      Azure: '#0078d4',
      NgRx: '#ba2bd2',
      Bootstrap: '#7952b3',
    };
    return techColors[tech] || '#6b7280';
  }

  getAllTechnologies(): string[] {
    const allTech = this.projects.flatMap((project) => project.technologies);
    return [...new Set(allTech)];
  }

  viewProject(project: Project): void {
    // Placeholder for project details view
    console.log('Viewing project:', project.title);
  }

  viewCode(project: Project): void {
    // Placeholder for source code view
    console.log('Viewing code for:', project.title);
  }
}
