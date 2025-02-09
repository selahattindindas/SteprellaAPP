import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

type MarginSize = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';

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
  readonly icon = input<string | 'none'>('fa-bolt');
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly margin = input<MarginSize>('8');
  
  readonly prev = output<void>();
  readonly next = output<void>();

  protected get marginClass(): string {
    return `tw-mb-${this.margin()}`;
  }
}
