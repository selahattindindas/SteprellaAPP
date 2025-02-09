import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-result-toolbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-toolbar.component.html',
  styleUrl: './result-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultToolbarComponent {
  readonly viewMode = signal<'grid' | 'list'>('grid');
  readonly totalCount = input.required<number>();
  setViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }
}
