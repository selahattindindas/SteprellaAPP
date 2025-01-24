import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CategoryService } from '../../../../../core/services/ui/category.service';
import { ListCategory } from '../../../../../core/models/categories/list-category';

@Component({
  selector: 'app-main-nav',
  imports: [],
  standalone: true,
  templateUrl: './main-nav.component.html',
  styleUrl: './main-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainNavComponent {

  private readonly categoryService = inject(CategoryService);

  readonly categoryList = signal<ListCategory[]>([]);
  
    constructor() {
      effect(() => {
        this.loadCategories();
      });
    }

  loadCategories(): void {
    this.categoryService.getAll()
      .subscribe({
        next: (variants) => this.categoryList.set(variants)
      });
  }
}
