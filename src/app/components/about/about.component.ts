import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  icon: string;
  proficiency: number;
  isAnimated?: boolean;
}

interface Highlight {
  title: string;
  description: string;
  icon: string;
  isVisible?: boolean;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
  animatedValue?: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
  experience = '4+';

  // Interactive stats with animation
  stats: Stat[] = [
    { label: 'Years Experience', value: 4, suffix: '+', animatedValue: 0 },
    { label: 'Projects Completed', value: 15, suffix: '+', animatedValue: 0 },
    { label: 'Technologies Mastered', value: 12, suffix: '', animatedValue: 0 },
    { label: 'Client Satisfaction', value: 98, suffix: '%', animatedValue: 0 },
  ];

  skills: Skill[] = [
    { name: 'Angular', icon: 'angular', proficiency: 95, isAnimated: false },
    { name: '.NET Core', icon: 'dotnet', proficiency: 90, isAnimated: false },
    { name: 'Azure', icon: 'cloud', proficiency: 85, isAnimated: false },
    {
      name: 'PostgreSQL',
      icon: 'database',
      proficiency: 88,
      isAnimated: false,
    },
    {
      name: 'Microservices',
      icon: 'microservices',
      proficiency: 82,
      isAnimated: false,
    },
    { name: 'CI/CD', icon: 'cicd', proficiency: 87, isAnimated: false },
  ];

  highlights: Highlight[] = [
    {
      title: 'Secure & Scalable',
      description:
        'Building applications with security and scalability at the core',
      icon: 'shield',
      isVisible: false,
    },
    {
      title: 'User-Friendly',
      description:
        'Creating intuitive interfaces that users love to interact with',
      icon: 'user',
      isVisible: false,
    },
    {
      title: 'Agile Methodology',
      description:
        'Working efficiently in Agile/Scrum environments with cross-functional teams',
      icon: 'agile',
      isVisible: false,
    },
    {
      title: 'Clean Code',
      description:
        'Delivering maintainable, well-documented, and testable code',
      icon: 'code',
      isVisible: false,
    },
  ];

  private animationIntervals: any[] = [];
  isScrolled = false;
  mousePosition = { x: 0, y: 0 };
  selectedSkill: Skill | null = null;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 100;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mousePosition.x = event.clientX;
    this.mousePosition.y = event.clientY;
  }

  ngOnInit() {
    // Animate stats on load
    setTimeout(() => this.animateStats(), 500);

    // Animate skills with staggered delay
    setTimeout(() => this.animateSkills(), 1000);

    // Show highlights with staggered animation
    setTimeout(() => this.showHighlights(), 1500);
  }

  ngOnDestroy() {
    // Clean up intervals
    this.animationIntervals.forEach((interval) => clearInterval(interval));
  }

  private animateStats() {
    this.stats.forEach((stat, index) => {
      setTimeout(() => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            stat.animatedValue = stat.value;
            clearInterval(interval);
          } else {
            stat.animatedValue = Math.floor(current);
          }
        }, duration / steps);

        this.animationIntervals.push(interval);
      }, index * 200);
    });
  }

  private animateSkills() {
    this.skills.forEach((skill, index) => {
      setTimeout(() => {
        skill.isAnimated = true;
      }, index * 150);
    });
  }

  private showHighlights() {
    this.highlights.forEach((highlight, index) => {
      setTimeout(() => {
        highlight.isVisible = true;
      }, index * 200);
    });
  }

  onSkillHover(skill: Skill) {
    // Just set the selected skill without resetting animation
    this.selectedSkill = skill;
  }

  onSkillLeave() {
    this.selectedSkill = null;
  }

  getSkillColor(proficiency: number): string {
    if (proficiency >= 90) return '#10b981'; // Green
    if (proficiency >= 80) return '#3b82f6'; // Blue
    if (proficiency >= 70) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  }

  getExperienceYears(): number {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  }

  toggleSkillDetails(skill: Skill) {
    this.selectedSkill = this.selectedSkill === skill ? null : skill;
  }

  getSkillDescription(skill: Skill): string {
    const descriptions: { [key: string]: string } = {
      Angular:
        'Advanced framework for building dynamic web applications with TypeScript',
      '.NET Core':
        'Cross-platform framework for building modern web APIs and services',
      Azure: 'Cloud platform for hosting, scaling, and managing applications',
      PostgreSQL:
        'Advanced open-source relational database with excellent performance',
      Microservices:
        'Architectural pattern for building scalable, distributed systems',
      'CI/CD':
        'Automated deployment pipelines for continuous integration and delivery',
    };
    return (
      descriptions[skill.name] ||
      'Professional experience with modern development practices'
    );
  }

  getSkillProjects(skill: Skill): number {
    const projectCounts: { [key: string]: number } = {
      Angular: 8,
      '.NET Core': 6,
      Azure: 5,
      PostgreSQL: 7,
      Microservices: 4,
      'CI/CD': 6,
    };
    return projectCounts[skill.name] || 3;
  }
}
