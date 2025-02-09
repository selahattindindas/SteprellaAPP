import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-price',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPriceComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

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

  ngOnInit() {
    // URL'den fiyat parametrelerini al
    this.route.queryParams.subscribe(params => {
      if (params['minPrice']) {
        this.priceRange.currentMin = Number(params['minPrice']);
      }
      if (params['maxPrice']) {
        this.priceRange.currentMax = Number(params['maxPrice']);
      }
    });
  }

  toggle(){
    this.toggleSection.emit(this.sectionKey());
  }

  updatePriceRange(type: 'min' | 'max', value: number): void {
    if (type === 'min') {
      this.priceRange.currentMin = Math.min(value, this.priceRange.currentMax);
    } else {
      this.priceRange.currentMax = Math.max(value, this.priceRange.currentMin);
    }

    // URL'yi güncelle
    const queryParams: any = {};
    if (this.priceRange.currentMin > 0) {
      queryParams.minPrice = this.priceRange.currentMin;
    }
    if (this.priceRange.currentMax < this.priceRange.max) {
      queryParams.maxPrice = this.priceRange.currentMax;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });

    this.filterChange.emit({
      type: 'price',
      value: {
        min: this.priceRange.currentMin,
        max: this.priceRange.currentMax
      }
    });
  }

  // Fiyat aralığını sıfırla
  resetPriceRange(): void {
    this.priceRange.currentMin = this.priceRange.min;
    this.priceRange.currentMax = this.priceRange.max;
    
    // URL'den fiyat parametrelerini kaldır
    const queryParams = { ...this.route.snapshot.queryParams };
    delete queryParams['minPrice'];
    delete queryParams['maxPrice'];
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });

    this.filterChange.emit({
      type: 'price',
      value: {
        min: this.priceRange.min,
        max: this.priceRange.max
      }
    });
  }
}
