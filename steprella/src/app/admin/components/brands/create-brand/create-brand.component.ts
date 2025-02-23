import { ChangeDetectionStrategy, Component, inject, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateBrand } from '../../../../core/models/brands/create-brand';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminBrandService } from '../../../../core/services/admin/admin-brand.service';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-brand',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDialogTitle, MatDialogContent, MatDialogActions,MatButtonModule],
  standalone: true,
  templateUrl: './create-brand.component.html',
  styleUrl: './create-brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
