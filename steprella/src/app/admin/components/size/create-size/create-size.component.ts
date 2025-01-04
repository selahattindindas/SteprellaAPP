import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SizeService } from '../../../../core/services/common/size.service';
import { CreateSize } from '../../../../core/models/sizes/create-size';
import { MatButtonModule } from '@angular/material/button';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-create-size',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  standalone: true,
  templateUrl: './create-size.component.html',
  styleUrl: './create-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSizeComponent {
  private readonly sizeService = inject(SizeService);
  private readonly sweetAlertService = inject(SweetAlertService);

  @ViewChild('form', { static: true }) form!: NgForm;
  @Input() productVariantId!: number;
  @Output() sizeList = new EventEmitter<void>();

  createSize: CreateSize = { productVariantId: null, sizeValue: null, stockQuantity: null };

  onSubmit() {
    if (!this.form.valid) return;

    const create = this.createSize = {
      ...this.form.value,
      productVariantId: this.productVariantId,
    }

    this.sizeService.create(create,
      () => {
        this.sweetAlertService.showMessage();
        this.form.reset();
        this.sizeList.emit();
      })
  }
}
