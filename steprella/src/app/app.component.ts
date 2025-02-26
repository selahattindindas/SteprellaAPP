import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal.component';
import { IMAGE_LOADER } from '@angular/common';
import { environment } from '../environments/environment';

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
export class AppComponent {}
