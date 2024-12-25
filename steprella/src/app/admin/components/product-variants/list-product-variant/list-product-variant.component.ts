import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ProductVariantService } from '../../../../core/services/common/product-variant.service';
import { Observable, of } from 'rxjs';
import { ListProductVariant } from '../../../../core/models/product-variants/list-product-variant';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../../../core/services/dialog.service';
import { ListSizeComponent } from '../../size/list-size/list-size.component';
import { ListFileComponent } from '../../file/list-file/list-file.component';
import { CreateProductVariantComponent } from "../create-product-variant/create-product-variant.component";
import { MatButtonModule } from '@angular/material/button';
import { UpdateProductVariantComponent } from "../update-product-variant/update-product-variant.component";

@Component({
  selector: 'app-list-product-variant',
  imports: [CommonModule, MatIconModule, CreateProductVariantComponent, MatButtonModule, UpdateProductVariantComponent],
  standalone: true,
  templateUrl: './list-product-variant.component.html',
  styleUrl: './list-product-variant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProductVariantComponent implements OnInit {
  private readonly productVariantService = inject(ProductVariantService);
  private readonly dialogService = inject(DialogService);

  @Input() productId!: number;
  editingVariantId: number | null = null;

  listProductVarian$: Observable<ListProductVariant[]> = of([]);
  
  ngOnInit(): void {
    this.getProductVariantByProductId();
  }

  getProductVariantByProductId(): void {
    this.listProductVarian$ = this.productVariantService.getByProductId(this.productId);
  }

  editRow(variantId: number) {
    this.editingVariantId = this.editingVariantId === variantId ? null : variantId;
  }

  onVariantUpdated(): void {
    this.editingVariantId = null;
  }

  sizeDialog(productVariantId: number): void {
    this.dialogService.openDialog({
      componentType: ListSizeComponent,
      data: { productVariantId: productVariantId },
      afterClosed: () => console.log('Dialog Açıldı'),
      options: { width: '1000px', height: '400px' },
    });
  }

  fileDialog(productVariantId: number): void {
      this.dialogService.openDialog({
        componentType: ListFileComponent,
        data: { productVariantId: productVariantId },
        afterClosed: () => console.log('Dialog Açıldı'),
        options: { width: '500px', height: '400px' },
      });
    }
}
