import { ChangeDetectionStrategy, Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SizeService } from '../../../../core/services/common/size.service';
import { CreateSize } from '../../../../core/models/sizes/create-size';
import { MatButtonModule } from '@angular/material/button';
import { firstValueFrom } from 'rxjs';

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

  @ViewChild('form', { static: true }) form!: NgForm;
  @Input() productVariantId!: number;
  
  createSize: CreateSize = { productVariantId: null, sizeValue: null, stockQuantity: null};

  async onSubmit() {
    if (!this.form.valid) return;

   const create = this.createSize = {
    ...this.form.value,
      productVariantId: this.productVariantId,
    }

    await firstValueFrom(
      this.sizeService.create(create,
        () => {
          console.log("Başarıyla Eklendi!")
        },
        eror => {
          console.log(eror);
        })
    )

  }
}
