import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './filter-button.component.html',  
  styleUrl: './filter-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterButtonComponent {
  readonly applyFilters = output<void>();
  readonly clearFilters = output<void>();
}
