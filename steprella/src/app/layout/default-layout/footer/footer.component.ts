import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    NgOptimizedImage
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  navigationLinks = [
    { title: 'Shop', path: '/shop' },
    { title: 'About', path: '/about' },
    { title: 'Blog', path: '/blog' },
    { title: 'Contact', path: '/contact' }
  ];

  socialLinks = [
    { icon: 'facebook' },
    { icon: 'instagram' },
    { icon: 'twitter' },
    { icon: 'pinterest' }
  ];
}
