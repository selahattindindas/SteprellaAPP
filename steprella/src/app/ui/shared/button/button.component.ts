import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  readonly title = input.required<string>();
  readonly bgColor = input<string>('bg-ui-bg');
  readonly textColor = input<string>('text-white');
  readonly padding = input<string>('p-4');
  readonly rounded = input<string>('rounded-full');
  readonly fontSize = input<string>();
  readonly fontWeight = input<string>('font-semibold');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
}
