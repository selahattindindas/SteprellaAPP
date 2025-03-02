import { ChangeDetectionStrategy, Component, input, computed, output, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FavoriteService } from '../../../core/services/ui/favorite.service';
import { CreateFavorite } from '../../../core/models/favorites/create-favorite';
import { AuthService } from '../../../core/services/common/auth.service';
import { SweetAlertService } from '../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CardComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private favoriteService = inject(FavoriteService);
  private authService = inject(AuthService);
  private sweetAlertService = inject(SweetAlertService);

  readonly data = input<any>();
  readonly variant = input<any>();
  readonly totalCount = input<number>();
  readonly currentPage = input<number>();
  readonly pageSize = input<number>();
  readonly onPageChange = output<number>();
  protected readonly Math = Math;

  readonly totalPages = computed(() => this.calculateTotalPages());

  readonly productData = computed(() => {
    const data = this.data();
    return data?.product || data;
  });

  readonly showHeartIcon = input<boolean>(true);
  readonly onDelete = output<void>();

  toggleFavorite(event: Event): void { 
    event?.stopPropagation();
    const currentVariant = this.variant();
    
    if (!currentVariant) return;
    
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    
    if (this.showHeartIcon()) {
      if (currentVariant.favorite) {
        return;
      }

      const createFavorite: CreateFavorite = {
        productVariantId: currentVariant.id
      };
      
      currentVariant.favorite = true;
      
      this.favoriteService.create(createFavorite).subscribe({
        next: () => {
          this.sweetAlertService.showMessage();
        },
        error: () => {
          currentVariant.favorite = false;
        }
      });
    } else {
      this.onDelete.emit();
    }
  }

  getVisiblePageNumbers(): number[] {
    const current = this.currentPage() ?? 1;
    const total = this.totalPages();
    if (!current) return [];
  
    return [...new Set([
      1,
      ...Array.from({ length: 3 }, (_, i) => current - 1 + i).filter(n => n > 1 && n < total),
      ...(total > 1 ? [total] : [])
    ])].sort((a, b) => a - b);
  }

  calculateTotalPages(): number {
    const total = this.totalCount();
    const size = this.pageSize();
    return (!total || !size) ? 0 : Math.ceil(total / size);
  }
  
  handlePageChange(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    }).then(() => this.onPageChange.emit(page));
  }

  getFirstActiveVariantId(): number {
    const product = this.productData();
    const currentVariant = this.variant();
    
    if (!product) return 0;
    
    if (currentVariant?.active) return currentVariant.id;
    return product.productVariants.find((v: { active: any; }) => v.active)?.id ?? product.productVariants[0].id;
  }
}