import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-price',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPriceComponent {
  readonly title = input<any>(''); 
  readonly sectionKey = input<string>('');
  readonly expandedSections = input<{ [key: string]: boolean }>({});
  readonly toggleSection = output<any>(); 
  readonly filterChange = output<{type: string, value: {min: number, max: number}}>();

  priceRange = {
    min: 0,
    max: 5000,
    currentMin: 0,
    currentMax: 5000
  };

  toggle(){
    this.toggleSection.emit(this.sectionKey());
  }

  updatePriceRange(type: 'min' | 'max', value: number): void {
    if (type === 'min') {
      this.priceRange.currentMin = Math.min(value, this.priceRange.currentMax);
    } else {
      this.priceRange.currentMax = Math.max(value, this.priceRange.currentMin);
    }

    this.filterChange.emit({
      type: 'price',
      value: {
        min: this.priceRange.currentMin,
        max: this.priceRange.currentMax
      }
    });
  }
}
