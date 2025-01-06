import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UpdateBrand } from '../../../../core/models/brands/update-brand';
import { MatInputModule } from '@angular/material/input';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminBrandService } from '../../../../core/services/admin/admin-brand.service';

@Component({
  selector: 'app-update-brand',
  imports: [FormsModule, MatInputModule],
  standalone: true,
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateBrandComponent {
  private readonly adminBrandService = inject(AdminBrandService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly brandForm = viewChild<NgForm>('brandForm');
  
  readonly brandData = input.required<any>();
  readonly brandUpdated = output<number | null>();
  readonly brandList = output<void>();

  readonly updateBrand = model<UpdateBrand>({
    id: null,
    name: ''
  });

  constructor() {
    effect(() => {
      if (this.brandData()) {
        this.updateBrand.set({ ...this.brandData() });
      }
    });
  }

  onSubmit(): void {
    const form = this.brandForm();
    if (!form?.valid) return;

    const update: UpdateBrand = {
      id: this.brandData().id,
      name: form.value.name
    };

    this.adminBrandService.update(update, () => {
      this.sweetAlertService.showMessage();
      this.brandUpdated.emit(null);
      this.brandList.emit();
    });
  }
}
