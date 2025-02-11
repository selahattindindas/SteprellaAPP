import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-result-toolbar',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: './result-toolbar.component.html',
  styleUrl: './result-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultToolbarComponent {
  viewMode = signal<'grid' | 'list'>('grid');
  totalCount = input.required<number>();
  selectedSort = signal('date_desc');
  selectedPerPage = signal('10');

  readonly sortOptions = [
    { value: 'date_desc', label: 'Varsayılan' },
    { value: 'price_asc', label: 'Artan Fiyat' },
    { value: 'price_desc', label: 'Azalan Fiyat' },
    { value: 'name_asc', label: 'Yeni Gelenler' }
  ];

  readonly perPageOptions = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '30', label: '30' },
    { value: '40', label: '40' }
  ];

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }

  onSortChange(value: string) {
    this.selectedSort.set(value);
  }

  onPerPageChange(value: string) {
    this.selectedPerPage.set(value);
  }
}
