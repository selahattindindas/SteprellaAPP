import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
