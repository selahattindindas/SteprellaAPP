import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-slider-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './slider-header.component.html',
  styleUrl: './slider-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderHeaderComponent {
  readonly title = input.required<string>();
  readonly icon = input<string>('fa-bolt');
  
  readonly prev = output<void>();
  readonly next = output<void>();
}
