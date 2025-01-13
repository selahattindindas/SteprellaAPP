import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { ProductVariantService } from '../../../../core/services/ui/product-variant.service';
import { ListProductVariant } from '../../../../core/models/product-variants/list-product-variant';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../../../core/services/common/dialog.service';
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
export class ListProductVariantComponent {
  private readonly productVariantService = inject(ProductVariantService);
  private readonly dialogService = inject(DialogService);

  readonly productId = input.required<number>();
  readonly editingVariantId = signal<number | null>(null);
  readonly productVariants = signal<ListProductVariant[]>([]);

  constructor() {
    effect(() => {
      this.loadProductVariants();
    });
  }

  loadProductVariants(): void {
    this.productVariantService.getByProductId(this.productId())
      .subscribe({
        next: (variants) => this.productVariants.set(variants)
      });
  }

  editRow(rowId: number): void {
    this.editingVariantId.update(current => current === rowId ? null : rowId);
  }

  onVariantUpdated(): void {
    this.editingVariantId.set(null);
    this.loadProductVariants();
  }

  sizeDialog(productVariantId: number): void {
    this.dialogService.openDialog({
      componentType: ListSizeComponent,
      data: { productVariantId },
      afterClosed: () => this.loadProductVariants(),
      options: { width: '800px', height: '600px' },
    });
  }

  fileDialog(productVariantId: number): void {
    this.dialogService.openDialog({
      componentType: ListFileComponent,
      data: { productVariantId },
      afterClosed: () => this.loadProductVariants(),
      options: { width: '800px', height: '600px' },
    });
  }
}