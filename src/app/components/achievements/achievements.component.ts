import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Achievement {
  id: number;
  title: string;
  description: string;
  metric: string;
  icon: string;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
})
export class AchievementsComponent {
  achievements: Achievement[] = [
    {
      id: 1,
      title: 'Performance Optimization',
      description:
        'Reduced Angular app load time by 30% using lazy loading & OnPush',
      metric: '30%',
      icon: 'performance',
    },
    {
      id: 2,
      title: 'Security Enhancement',
      description:
        'Improved security with JWT authentication in .NET Core (95% fewer unauthorized attempts)',
      metric: '95%',
      icon: 'security',
    },
    {
      id: 3,
      title: 'Team Leadership',
      description:
        'Mentored 2 junior developers and improved code quality by 20%',
      metric: '20%',
      icon: 'mentoring',
    },
  ];
}
