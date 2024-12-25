import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ColorService } from '../../../../core/services/common/color.service';
import { CommonModule } from '@angular/common';
import { CreateProductVariant } from '../../../../core/models/product-variants/create-product-variant';
import { ProductVariantService } from '../../../../core/services/common/product-variant.service';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-create-product-variant',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule, MatButtonModule],
  standalone: true,
  templateUrl: './create-product-variant.component.html',
  styleUrl: './create-product-variant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateProductVariantComponent {
  private readonly colorService = inject(ColorService);
  private readonly productVariantService = inject(ProductVariantService);
  private readonly sweetAlertService = inject(SweetAlertService);

  @ViewChild('variantForm', { static: true }) variantForm!: NgForm;
  @Input() productId!: number;
  @Output() variantList = new EventEmitter<void>();

  listColor$ = this.colorService.getAll();
  createVariant: CreateProductVariant = { productId: null, colorId: null, active: false };

  async onSubmit() {
    if (!this.variantForm.valid) return;

    this.createVariant = {
      productId: this.productId,
      colorId: this.variantForm.value.colorId,
      active: false
    };

    await firstValueFrom(this.productVariantService.create(this.createVariant,
      () => {
        this.sweetAlertService.showMessage();
        this.variantForm.reset();
        this.variantList.emit();
      },
      error => {
      }))
  }
}
