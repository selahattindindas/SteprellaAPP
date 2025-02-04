import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent {
  readonly pageSize = input.required<number>();
  readonly totalCount = input.required<number>();
  readonly pageChange = output<number>();

  currentPage = computed(() => {
    const page = this.route.snapshot.queryParams['page'] || 1;
    return +page; // Convert to number
  });

  totalPages = computed(() => Math.ceil(this.totalCount() / this.pageSize()));

  constructor(private router: Router, private route: ActivatedRoute) {}

  // Optional: Handle page change from URL
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = params['page'] || 1;
      this.pageChange.emit(+page);
    });
  }

  getPageNumbers(): (number | string)[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | string)[] = [];

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    pages.push(1);
    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) pages.push('...');
    pages.push(total);

    return pages;
  }

  changePage(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages()) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page },
        queryParamsHandling: 'merge'
      });
      this.pageChange.emit(page);
    }
  }
}
