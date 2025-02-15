import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DropdownComponent } from '../../../../shared/dropdown/dropdown.component';

@Component({
  selector: 'app-order-filter',
  standalone: true,
  imports: [CommonModule, DropdownComponent],
  templateUrl: './order-filter.component.html',
  styleUrl: './order-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFilterComponent {
  readonly filterOptions = [
    { value: 'all_desc', label: 'Hepsi' },
    { value: 'one_desc', label: 'Son 1 Ay' },
    { value: 'three_desc', label: 'Son 3 Ay' },
  ];
}
