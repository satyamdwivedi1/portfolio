import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  name: string;
  role: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface Experience {
  company: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string;
  achievements: string[];
  technologies: string[];
  projects?: Project[];
  isCurrentJob?: boolean;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      company: 'TatvaSoft',
      role: 'Full-Stack Developer',
      duration: 'Feb 2023 – Present',
      startDate: 'Feb 2023',
      endDate: 'Present',
      isCurrentJob: true,
      achievements: [
        'Delivered two major full-stack projects with modern web technologies',
        'Implemented real-time tracking systems and admin panels',
        'Integrated advanced features like OCR verification and state management',
        'Improved system efficiency and reduced manual work significantly',
      ],
      technologies: [
        'Angular',
        '.NET Core Web API',
        'PostgreSQL',
        'Azure',
        'Angular Material',
        'Ngxs',
      ],
      projects: [
        {
          name: 'Digital Logistics Tracker',
          role: 'Full-Stack Developer',
          description: 'Real-time tracking platform for logistics management',
          achievements: [
            'Built comprehensive shipment tracking system with real-time updates',
            'Developed shipment management and customs clearance modules',
            'Integrated OCR verification system for goods authentication',
            'Implemented automated tax calculation and compliance features',
            'Improved tracking accuracy and reduced manual processing by 40%',
          ],
          technologies: ['Angular', '.NET Core Web API', 'PostgreSQL', 'Azure'],
        },
        {
          name: 'Octopus Cloud Admin Panel',
          role: 'Full-Stack Developer',
          description:
            'Comprehensive admin panel for cloud infrastructure management',
          achievements: [
            'Built scalable admin panel for managing users, organizations, and hardware',
            'Created reusable Angular component library with consistent design system',
            'Implemented Ngxs state management for complex data flows',
            'Designed intuitive UI/UX for data sources, views, and credentials management',
            'Enhanced system maintainability and development efficiency',
          ],
          technologies: [
            'Angular',
            'Angular Material',
            'Ngxs',
            '.NET Core Web API',
          ],
        },
      ],
    },
    {
      company: 'Mobiloitte Pvt Ltd',
      role: 'Front-End Developer',
      duration: 'Jun 2021 – Feb 2022',
      startDate: 'Jun 2021',
      endDate: 'Feb 2022',
      achievements: [
        'Developed comprehensive web applications with modern Angular framework',
        'Implemented responsive and user-friendly interfaces',
        'Collaborated with cross-functional teams to deliver high-quality solutions',
        'Gained expertise in front-end development and modern web technologies',
      ],
      technologies: ['Angular', 'Angular Material', 'Bootstrap', 'TypeScript'],
      projects: [
        {
          name: 'Site Management Platform',
          role: 'Front-End Developer',
          description:
            'Comprehensive platform for managing business operations and workflows',
          achievements: [
            'Built a scalable site management platform serving 1,000+ active users',
            'Automated job creation workflows reducing manual input by 60%',
            'Implemented customer tracking system with real-time status updates',
            'Developed payment processing interface with secure transaction handling',
            'Created responsive design ensuring optimal experience across all devices',
            'Reduced manual administrative work by 50% through intelligent automation',
          ],
          technologies: [
            'Angular',
            'Angular Material',
            'Bootstrap',
            'TypeScript',
          ],
        },
      ],
    },
  ];

  getTotalExperience(): string {
    const startDate = new Date('2021-06-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
    return `${diffYears}+ years`;
  }

  getCompanyCount(): number {
    return this.experiences.length;
  }

  getTotalProjects(): number {
    return this.experiences.reduce((total, exp) => {
      return total + (exp.projects ? exp.projects.length : 0);
    }, 0);
  }

  // Get projects count for companies that have projects
  getProjectsCount(): number {
    const companiesWithProjects = this.experiences.filter(
      (exp) => exp.projects && exp.projects.length > 0
    );
    return companiesWithProjects.reduce(
      (total, exp) => total + (exp.projects?.length || 0),
      0
    );
  }

  getAllTechnologies(): string[] {
    const allTech = this.experiences.flatMap((exp) => {
      const expTech = exp.technologies || [];
      const projectTech = exp.projects
        ? exp.projects.flatMap((p) => p.technologies)
        : [];
      return [...expTech, ...projectTech];
    });
    return [...new Set(allTech)];
  }

  // Get experience summary for better organization
  getExperienceSummary() {
    return {
      totalYears: this.getTotalExperience(),
      companies: this.getCompanyCount(),
      projects: this.getTotalProjects(),
      technologies: this.getAllTechnologies().length,
      currentRole:
        this.experiences.find((exp) => exp.isCurrentJob)?.role || 'N/A',
      currentCompany:
        this.experiences.find((exp) => exp.isCurrentJob)?.company || 'N/A',
    };
  }
}
