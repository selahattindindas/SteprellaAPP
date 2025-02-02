import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-filter-section',
  imports: [],
  standalone: true,
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterSectionComponent {
  readonly title = input<any>(''); 
  readonly items = input<any[]>([]); 
  readonly sectionKey = input<string>('');
  readonly expandedSections = input<{ [key: string]: boolean }>({});
  readonly toggleSection = output<any>(); 
  readonly loadMore = output<void>();
  readonly filterChange = output<{type: string, value: number, checked: boolean}>();
  
  currentPage = signal<number>(0);
  readonly PAGE_SIZE = 5;
  
  toggle(){
    this.toggleSection.emit(this.sectionKey());
  }

  showMore() {
    this.loadMore.emit();
  }

  hasMoreItems() {
    return this.items().length > 0 && this.items().length % this.PAGE_SIZE === 0;
  }

  onCheckboxChange(item: any, event: any) {
    // Cinsiyet seçimi için özel kontrol
    if (this.sectionKey() === 'genders') {
      // Diğer tüm öğelerin seçimini kaldır
      this.items().forEach(i => {
        if (i.id !== item.id) {
          i.selected = false;
        }
      });
      item.selected = event.target.checked;
    }

    const value = this.sectionKey() === 'sizes' ? item.name : item.id;

    this.filterChange.emit({
      type: this.sectionKey(),
      value: value,
      checked: event.target.checked
    });
  }
}
