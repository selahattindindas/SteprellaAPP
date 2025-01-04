import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { UpdateProductVariant } from '../../../../core/models/product-variants/update-product-variant';
import { ProductVariantService } from '../../../../core/services/common/product-variant.service';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-update-product-variant',
  imports: [FormsModule, MatIconModule, MatButtonModule, MatRadioModule],
  standalone: true,
  templateUrl: './update-product-variant.component.html',
  styleUrl: './update-product-variant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UpdateProductVariantComponent implements OnInit {
  private readonly productVariantService = inject(ProductVariantService);
  readonly sweetAlertService = inject(SweetAlertService);

  @ViewChild('variantForm', { static: true }) variantForm!: NgForm;
  @Input() productId!: number;
  @Input() variantData!: any;

  @Output() variantUpdated = new EventEmitter<number | null>();
  @Output() variantList = new EventEmitter<void>();

  updateVariant!: UpdateProductVariant;

  ngOnInit(): void {
    if (this.variantData) {
      this.updateVariant = { ...this.variantData };
    }
  }

  onActiveChange(newValue: boolean) {
    this.updateVariant = {
      id: this.variantData.id,
      productId: this.productId,
      active: newValue
    }

    this.productVariantService.update(this.updateVariant,
      () => {
        console.log("Başarıyla güncellendi");
        this.sweetAlertService.showMessage();
        this.variantUpdated.emit(null);
        this.variantList.emit();
      }
    )
  }
}
