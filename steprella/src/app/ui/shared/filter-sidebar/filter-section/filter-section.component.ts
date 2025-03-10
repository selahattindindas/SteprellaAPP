import { ChangeDetectionStrategy, Component, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-section',
  imports: [],
  standalone: true,
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSectionComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly title = input<any>(''); 
  readonly items = input<any[]>([]);  
  readonly sectionKey = input<string>('');
  readonly expandedSections = input<{ [key: string]: boolean }>({});
  
  readonly toggleSection = output<any>(); 
  readonly loadMore = output<string>();
  readonly filterChange = output<{type: string, value: number, checked: boolean}>();
    
  ngOnInit() {
    if (this.sectionKey() === 'genders') {
      this.route.queryParams.subscribe(params => {
        const categoryId = params['categoryId'];
        if (categoryId && this.items().length > 0) {
          const matchingGender = this.items().find(item => item.id === Number(categoryId));
          if (matchingGender) {
            this.items().forEach(item => {
              item.selected = item.id === matchingGender.id;
            });
          }
        }
      });
    }
    
    if (this.sectionKey() === 'brands') {
      this.route.queryParams.subscribe(params => {
        const brandId = params['brandId'];
        if (brandId && this.items().length > 0) {
          const matchingBrand = this.items().find(item => item.id === Number(brandId));
          if (matchingBrand) {
            this.items().forEach(item => {
              item.selected = item.id === matchingBrand.id;
            });
          }
        }
      });
    }
  }

  ngOnChanges() {
    if (this.sectionKey() === 'genders' && this.items().length > 0) {
      const categoryId = this.route.snapshot.queryParams['categoryId'];
      if (categoryId) {
        const matchingGender = this.items().find(item => item.id === Number(categoryId));
        if (matchingGender) {
          this.items().forEach(item => {
            item.selected = item.id === matchingGender.id;
          });
        }
      }
    }

    if (this.sectionKey() === 'brands' && this.items().length > 0) {
      const brandId = this.route.snapshot.queryParams['brandId'];
      if (brandId) {
        const matchingBrand = this.items().find(item => item.id === Number(brandId));
        if (matchingBrand) {
          this.items().forEach(item => {
            item.selected = item.id === matchingBrand.id;
          });
        }
      }
    }
  }

  toggle(){
    this.toggleSection.emit(this.sectionKey());
  }

  onCheckboxChange(item: any, event: any) {
    if (this.sectionKey() === 'genders') {
      this.items().forEach(i => {
        if (i.id !== item.id) {
          i.selected = false;
        }
      });
      item.selected = event.target.checked;

      if (event.target.checked) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { categoryId: item.id },
          queryParamsHandling: 'merge'
        });
      }
    }

    const value = this.sectionKey() === 'sizes' ? item.name : item.id;

    this.filterChange.emit({
      type: this.sectionKey(),
      value: value,
      checked: event.target.checked
    });
  }
}
