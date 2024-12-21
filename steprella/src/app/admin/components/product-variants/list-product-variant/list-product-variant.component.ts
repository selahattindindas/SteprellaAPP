import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ProductVariantService } from '../../../../core/services/common/product-variant.service';
import { catchError, Observable, of } from 'rxjs';
import { ListProductVariant } from '../../../../core/models/product-variants/list-product-variant';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product-variant',
  imports: [CommonModule, MatIconModule],
  standalone: true,
  templateUrl: './list-product-variant.component.html',
  styleUrl: './list-product-variant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProductVariantComponent implements OnInit {
  @Input() productId!: number;
  readonly productVariantService = inject(ProductVariantService);
  readonly router = inject(Router);
  listProductVarian$: Observable<ListProductVariant[]> = of([]);
  
  ngOnInit(): void {
    this.getProductVariantByProductId();
  }

  getProductVariantByProductId(): void {
    this.listProductVarian$ = this.productVariantService.getByProductId(this.productId).pipe(
      catchError(error => {
        console.error('Ürün variyantları bulunamadı:', error);
        return of([]); 
      })
    );
  }

  navigateAndCloseDialog(variantId: number): void {
    this.router.navigate(['/variant-edit', variantId]).then(() => {
    });
  }

}
