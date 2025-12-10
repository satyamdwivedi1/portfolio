import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  proficiency?: number;
  isHovered?: boolean;
  category?: string;
}

interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
  color: string;
  isVisible?: boolean;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit, OnDestroy {
  selectedCategory: SkillCategory | null = null;
  animationTimeouts: any[] = [];
  hoveredSkill: Skill | null = null;
  filterLevel: string = 'all';
  searchTerm: string = '';
  isComparisonMode: boolean = false;
  comparedSkills: Skill[] = [];

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.selectedCategory = null;
      this.hoveredSkill = null;
      this.isComparisonMode = false;
      this.comparedSkills = [];
    }
  }
  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: 'frontend',
      color: '#3b82f6',
      isVisible: true,
      isExpanded: false,
      skills: [
        { name: 'Angular', level: 'expert', proficiency: 95, isHovered: false },
        {
          name: 'Angular Material',
          level: 'advanced',
          proficiency: 88,
          isHovered: false,
        },
        {
          name: 'Bootstrap',
          level: 'advanced',
          proficiency: 85,
          isHovered: false,
        },
        { name: 'RxJS', level: 'advanced', proficiency: 82, isHovered: false },
        {
          name: 'NgRx',
          level: 'intermediate',
          proficiency: 75,
          isHovered: false,
        },
        {
          name: 'JavaScript (ES6+)',
          level: 'expert',
          proficiency: 92,
          isHovered: false,
        },
        {
          name: 'TypeScript',
          level: 'expert',
          proficiency: 90,
          isHovered: false,
        },
      ],
    },
    {
      title: 'Backend',
      icon: 'backend',
      color: '#8b5cf6',
      isVisible: true,
      isExpanded: false,
      skills: [
        {
          name: 'ASP.NET Core Web API',
          level: 'expert',
          proficiency: 93,
          isHovered: false,
        },
        { name: 'C#', level: 'expert', proficiency: 91, isHovered: false },
        {
          name: 'Entity Framework',
          level: 'advanced',
          proficiency: 87,
          isHovered: false,
        },
        { name: 'LINQ', level: 'advanced', proficiency: 85, isHovered: false },
      ],
    },
    {
      title: 'Database',
      icon: 'database',
      color: '#10b981',
      isVisible: true,
      isExpanded: false,
      skills: [
        {
          name: 'PostgreSQL',
          level: 'advanced',
          proficiency: 86,
          isHovered: false,
        },
        {
          name: 'MongoDB',
          level: 'intermediate',
          proficiency: 78,
          isHovered: false,
        },
        {
          name: 'SQL Server',
          level: 'advanced',
          proficiency: 84,
          isHovered: false,
        },
      ],
    },
    {
      title: 'Cloud/DevOps',
      icon: 'cloud',
      color: '#f59e0b',
      isVisible: true,
      isExpanded: false,
      skills: [
        {
          name: 'Azure App Services',
          level: 'advanced',
          proficiency: 83,
          isHovered: false,
        },
        {
          name: 'CI/CD (Azure DevOps)',
          level: 'advanced',
          proficiency: 81,
          isHovered: false,
        },
        {
          name: 'GitHub Actions',
          level: 'intermediate',
          proficiency: 76,
          isHovered: false,
        },
        {
          name: 'Docker',
          level: 'intermediate',
          proficiency: 74,
          isHovered: false,
        },
      ],
    },
    {
      title: 'Tools',
      icon: 'tools',
      color: '#ef4444',
      isVisible: true,
      isExpanded: false,
      skills: [
        { name: 'GitHub', level: 'expert', proficiency: 94, isHovered: false },
        {
          name: 'Bitbucket',
          level: 'advanced',
          proficiency: 87,
          isHovered: false,
        },
        { name: 'Jira', level: 'advanced', proficiency: 89, isHovered: false },
      ],
    },
  ];

  ngOnInit() {
    // Animate categories with staggered delay
    setTimeout(() => this.animateCategories(), 500);
  }

  ngOnDestroy() {
    this.animationTimeouts.forEach((timeout) => clearTimeout(timeout));
  }

  private animateCategories() {
    this.skillCategories.forEach((category, index) => {
      const timeout = setTimeout(() => {
        category.isVisible = true;
      }, index * 200);
      this.animationTimeouts.push(timeout);
    });

    // Ensure all categories are visible after animation completes
    const finalTimeout = setTimeout(() => {
      this.skillCategories.forEach((category) => {
        category.isVisible = true;
      });
    }, this.skillCategories.length * 200 + 500);
    this.animationTimeouts.push(finalTimeout);
  }

  getLevelValue(level: string): number {
    const levels = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4,
    };
    return levels[level as keyof typeof levels] || 2;
  }

  getTotalSkills(): number {
    return this.skillCategories.reduce(
      (total, category) => total + category.skills.length,
      0
    );
  }

  toggleCategory(category: SkillCategory) {
    category.isExpanded = !category.isExpanded;
    this.selectedCategory = category.isExpanded ? category : null;
  }

  onSkillHover(skill: Skill, isEntering: boolean) {
    skill.isHovered = isEntering;
  }

  getSkillProficiency(skill: Skill): number {
    return (
      skill.proficiency ||
      this.getLevelValue(skill.level || 'intermediate') * 25
    );
  }

  getProficiencyColor(proficiency: number): string {
    if (proficiency >= 90) return '#10b981';
    if (proficiency >= 80) return '#3b82f6';
    if (proficiency >= 70) return '#f59e0b';
    return '#ef4444';
  }

  toggleComparisonMode() {
    this.isComparisonMode = !this.isComparisonMode;
    if (!this.isComparisonMode) {
      this.comparedSkills = [];
    }

    // Ensure all categories are visible when toggling comparison mode
    this.skillCategories.forEach((category) => {
      category.isVisible = true;
    });
  }

  addToComparison(skill: Skill, category: SkillCategory) {
    if (this.isComparisonMode) {
      const skillWithCategory = { ...skill, category: category.title };
      const index = this.comparedSkills.findIndex((s) => s.name === skill.name);

      if (index > -1) {
        this.comparedSkills.splice(index, 1);
      } else if (this.comparedSkills.length < 4) {
        this.comparedSkills.push(skillWithCategory);
      }
    }
  }

  isInComparison(skill: Skill): boolean {
    return this.comparedSkills.some((s) => s.name === skill.name);
  }

  removeFromComparison(skill: Skill) {
    const index = this.comparedSkills.findIndex((s) => s.name === skill.name);
    if (index > -1) {
      this.comparedSkills.splice(index, 1);
    }
  }

  getFilteredCategories(): SkillCategory[] {
    return this.skillCategories
      .map((category) => ({
        ...category,
        // Preserve the visibility state from the original category
        isVisible: category.isVisible,
        isExpanded: category.isExpanded,
        skills: category.skills.filter((skill) => {
          const matchesLevel =
            this.filterLevel === 'all' || skill.level === this.filterLevel;
          const matchesSearch = skill.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
          return matchesLevel && matchesSearch;
        }),
      }))
      .filter((category) => category.skills.length > 0);
  }

  setFilter(level: string) {
    this.filterLevel = level;

    // Ensure all categories are visible when filtering
    this.skillCategories.forEach((category) => {
      category.isVisible = true;
    });
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;

    // Ensure all categories are visible when searching
    if (this.searchTerm.length > 0) {
      this.skillCategories.forEach((category) => {
        category.isVisible = true;
      });
    }
  }

  getSkillsByLevel(level: string): number {
    return this.skillCategories.reduce(
      (count, category) =>
        count + category.skills.filter((skill) => skill.level === level).length,
      0
    );
  }

  getAverageProficiency(): number {
    const allSkills = this.skillCategories.flatMap((cat) => cat.skills);
    const total = allSkills.reduce(
      (sum, skill) => sum + this.getSkillProficiency(skill),
      0
    );
    return Math.round(total / allSkills.length);
  }

  // Convert proficiency percentage to star rating (1-5 stars)
  getStarRating(proficiency: number): number {
    if (proficiency >= 90) return 5;
    if (proficiency >= 80) return 4;
    if (proficiency >= 70) return 3;
    if (proficiency >= 60) return 2;
    return 1;
  }

  // Generate array for star display
  getStarArray(rating: number): boolean[] {
    return Array(5)
      .fill(false)
      .map((_, index) => index < rating);
  }

  // Debug method to check if categories have skills
  debugCategories() {
    console.log('Categories:', this.skillCategories);
    this.skillCategories.forEach((cat) => {
      console.log(
        `${cat.title}: ${cat.skills.length} skills, visible: ${cat.isVisible}`
      );
    });
  }

  // Method for displayed categories
  getDisplayedCategories(): SkillCategory[] {
    if (this.filterLevel === 'all' && this.searchTerm === '') {
      return this.skillCategories;
    }

    return this.skillCategories
      .map((category) => ({
        ...category,
        skills: category.skills.filter((skill) => {
          const matchesLevel =
            this.filterLevel === 'all' || skill.level === this.filterLevel;
          const matchesSearch = skill.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
          return matchesLevel && matchesSearch;
        }),
      }))
      .filter((category) => category.skills.length > 0);
  }
}
