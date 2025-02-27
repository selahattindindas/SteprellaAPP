import { Component, inject, effect } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal.component';
import { IMAGE_LOADER, DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
import { filter } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

function appImageLoader(config: { src: string }): string {
  if (config.src.startsWith('http')) {
    return config.src; 
  }

  if (config.src.startsWith('assets/')) {
    return `/${config.src}`;
  }

  if (config.src.startsWith('photo/')) {
    return `${environment.photoUrl}/${config.src}`;
  }

  return config.src; 
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: appImageLoader,
    }
  ]
})
export class AppComponent {
  private router = inject(Router);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          this.document.defaultView?.scrollTo(0, 0);
        }
      });
    });
  }
}