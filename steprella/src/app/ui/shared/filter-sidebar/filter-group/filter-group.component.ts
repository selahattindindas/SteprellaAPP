import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import { FilterButtonComponent } from '../filter-button/filter-button.component';
import { FilterSectionComponent } from '../filter-section/filter-section.component';
import { BrandService } from '../../../../core/services/ui/brand.service';
import { ColorService } from '../../../../core/services/ui/color.service';
import { MaterialService } from '../../../../core/services/ui/material.service';
import { UsageAreaService } from '../../../../core/services/ui/usage-area.service';
import { StaticDataService } from '../../../../core/services/common/static-data.service';
import { ListBrand } from '../../../../core/models/brands/list-brand';
import { ListColor } from '../../../../core/models/colors/list-color';
import { ListFeature } from '../../../../core/models/features/list-feature';
import { ListMaterial } from '../../../../core/models/materials/list-material';
import { ListUsageArea } from '../../../../core/models/usage-areas/list-usage-area';
import { FeatureService } from '../../../../core/services/ui/feature.service';

@Component({
  selector: 'app-filter-group',
  standalone: true,
  imports: [CommonModule, FilterSectionComponent, FilterButtonComponent],
  templateUrl: './filter-group.component.html',
  styleUrl: './filter-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterGroupComponent {
  private readonly brandService = inject(BrandService);
  private readonly colorService = inject(ColorService);
  private readonly featureService = inject(FeatureService);
  private readonly materialService = inject(MaterialService);
  private readonly usageAreaService = inject(UsageAreaService);
  private readonly staticDataService = inject(StaticDataService);

  // Signals for lists
  readonly brandList = signal<ListBrand[]>([]);
  readonly colorList = signal<ListColor[]>([]);
  readonly featureList = signal<ListFeature[]>([]);
  readonly materialList = signal<ListMaterial[]>([]);
  readonly usageAreaList = signal<ListUsageArea[]>([]);
  readonly sizeList = signal<any[]>([]);
  readonly genderList = signal<any[]>([]);

  // Selected filters
  readonly selectedFilters = signal<{[key: string]: number[]}>({});

  // Outputs
  readonly applyFilters = output<any>();
  readonly clearFilters = output<void>();

  // Section states
  expandedSections: { [key: string]: boolean } = {
    brands: true,
    colors: true,
    sizes: true,
    genders: true,
    materials: true,
    usageAreas: true
  };

  readonly priceRanges = signal<any[]>([
    { id: 1, name: '0 TL - 500 TL', min: 0, max: 500, selected: false },
    { id: 2, name: '500 TL - 2000 TL', min: 500, max: 2000, selected: false },
    { id: 3, name: '2000 TL ve üzeri', min: 2000, max: null, selected: false }
  ]);

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    // Load initial data from services
    this.brandService.getAll(0,5).subscribe(response => this.brandList.set(response.data));
    this.featureService.getAll(0,5).subscribe(response => this.featureList.set(response.data));
    this.colorService.getAll().subscribe(response => this.colorList.set(response));
    this.materialService.getAll(0,5).subscribe(response => this.materialList.set(response.data));
    this.usageAreaService.getAll(0,5).subscribe(response => this.usageAreaList.set(response.data));
    this.staticDataService.getSizes(0,5).subscribe(response => this.sizeList.set(response.data));
    this.staticDataService.getGenders(0,5).subscribe(response => this.genderList.set(response.data));
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  onFilterChange(event: {type: string, value: any, checked?: boolean}) {
    this.selectedFilters.update(current => {
      if (event.type === 'price') {
        const priceValue = event.value;
        return {
          ...current,
          minPrice: priceValue.min,
          maxPrice: priceValue.max
        };
      }

      const values = current[event.type] || [];
      if (event.checked) {
        return { ...current, [event.type]: [...values, event.value] };
      } else {
        return { ...current, [event.type]: values.filter(v => v !== event.value) };
      }
    });
  }

  handleApplyFilters() {
    const filters = {
      brandId: this.selectedFilters()['brands'],
      colorId: this.selectedFilters()['colors'],
      categoryId: this.selectedFilters()['categoryId'], 
      sizeValue: this.selectedFilters()['sizes'],
      materialId: this.selectedFilters()['materials'],
      usageAreaId: this.selectedFilters()['usageAreas'],
      minPrice: this.selectedFilters()['minPrice'],
      maxPrice: this.selectedFilters()['maxPrice']
    };

    this.applyFilters.emit(filters);
  }

  handleClearFilters() {
    this.selectedFilters.set({});
    this.clearFilters.emit();
  }
}