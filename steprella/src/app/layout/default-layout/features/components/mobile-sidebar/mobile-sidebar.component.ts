import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../../../../core/services/ui/category.service';
import { ListCategory } from '../../../../../core/models/categories/list-category';
import { UrlService } from '../../../../../core/services/common/url.service';

@Component({
  selector: 'app-mobile-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './mobile-sidebar.component.html',
  styleUrl: './mobile-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileSidebarComponent {
  private readonly categoryService = inject(CategoryService);
  readonly urlService = inject(UrlService);

  readonly categoryList = signal<ListCategory[]>([]);
  readonly isOpen = signal(false);
  readonly selectedMainCategory = signal<number | null>(null);
  readonly selectedSubCategory = signal<number | null>(null);

  constructor() {
    effect(() => {
      this.loadCategories();
    });
    this.selectedMainCategory.set(12);
  }

  loadCategories(): void {
    this.categoryService.getAll()
      .subscribe({
        next: (variants) => this.categoryList.set(variants)
      });
  }

  toggleSidebar(): void {
    this.isOpen.set(!this.isOpen());
  }

  toggleMainCategory(categoryId: number): void {
    this.selectedMainCategory.set(categoryId);
    this.selectedSubCategory.set(null);
  }

  toggleSubCategory(categoryId: number): void {
    if (this.selectedSubCategory() === categoryId) {
      this.selectedSubCategory.set(null);
    } else {
      this.selectedSubCategory.set(categoryId);
    }
  }
}
