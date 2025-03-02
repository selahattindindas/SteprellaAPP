import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal, output, HostListener } from '@angular/core';
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
import { FilterPriceComponent } from '../filter-price/filter-price.component';

@Component({
  selector: 'app-filter-group',
  standalone: true,
  imports: [CommonModule, FilterSectionComponent, FilterPriceComponent, FilterButtonComponent],
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

  readonly brandList = signal<ListBrand[]>([]);
  readonly colorList = signal<ListColor[]>([]);
  readonly featureList = signal<ListFeature[]>([]);
  readonly materialList = signal<ListMaterial[]>([]);
  readonly usageAreaList = signal<ListUsageArea[]>([]);
  readonly sizeList = signal<any[]>([]);
  readonly genderList = signal<any[]>([]);

  readonly selectedFilters = signal<{ [key: string]: number[] }>({});

  readonly applyFilters = output<any>();
  readonly clearFilters = output<void>();

  readonly isOpen = signal(false);

  expandedSections: { [key: string]: boolean } = {
    brands: true,
    colors: true,
    sizes: true,
    genders: true,
    materials: true,
    usageAreas: true
  };

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    this.brandService.getAll().subscribe(response => this.brandList.set(response.data));
    this.featureService.getAll().subscribe(response => this.featureList.set(response.data));
    this.colorService.getAll().subscribe(response => this.colorList.set(response.data));
    this.materialService.getAll().subscribe(response => this.materialList.set(response.data));
    this.usageAreaService.getAll().subscribe(response => this.usageAreaList.set(response.data));
    this.staticDataService.getSizes().subscribe(response => this.sizeList.set(response.data));
    this.staticDataService.getGenders().subscribe(response => this.genderList.set(response.data));
  }

  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  onFilterChange(event: { type: string, value: any, checked?: boolean }) {
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

  @HostListener('document:keydown.escape')
  handleEscKey(): void {
    if (this.isOpen()) {
      this.toggleSidebar();
    }
  }

  toggleSidebar(): void {
    this.isOpen.update(value => !value);
  }
}