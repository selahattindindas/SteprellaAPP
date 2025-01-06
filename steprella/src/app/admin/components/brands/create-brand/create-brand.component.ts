import { Component, EventEmitter, inject, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateBrand } from '../../../../core/models/brands/create-brand';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminBrandService } from '../../../../core/services/admin/admin-brand.service';

@Component({
  selector: 'app-create-brand',
  imports: [FormsModule, MatFormField, MatInputModule],
  standalone: true,
  templateUrl: './create-brand.component.html',
  styleUrl: './create-brand.component.scss'
})
export class CreateBrandComponent {
  private readonly adminBrandService = inject(AdminBrandService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly brandForm = viewChild<NgForm>('brandForm');

  readonly brandList = output<void>();
  
  readonly createBrand = model<CreateBrand>({
    name: ''
  });

  onSubmit(): void {
    const form = this.brandForm();
    if (!form?.valid) return;

    this.adminBrandService.create(
      { name: form.value.name },
      () => {
        this.sweetAlertService.showMessage();
        this.brandList.emit();
        form.reset();
      }
    );
  }
}
