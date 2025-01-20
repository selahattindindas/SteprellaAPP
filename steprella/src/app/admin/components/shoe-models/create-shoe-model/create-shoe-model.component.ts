import { ChangeDetectionStrategy, Component, inject, input, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateShoeModel } from '../../../../core/models/shoe-models/create-shoe-model';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminShoeModelService } from '../../../../core/services/admin/admin-shoe-model.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-shoe-model',
  imports: [FormsModule, MatInputModule, MatIconModule],
  standalone: true,
  templateUrl: './create-shoe-model.component.html',
  styleUrl: './create-shoe-model.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateShoeModelComponent {
  private readonly adminShoeModelService = inject(AdminShoeModelService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly brandId = input.required<number>();
  readonly shoeModelList = output<void>();

  readonly shoeModelForm = viewChild<NgForm>('shoeModelForm');

  readonly createShoeModel = model<CreateShoeModel>({
    brandId: null,
    name: null
  });

  onSubmit(): void {
    const form = this.shoeModelForm();
    if (!form?.valid) return;

    const modelData: CreateShoeModel = {
      name: form.value.name,
      brandId: this.brandId()
    };

    this.adminShoeModelService.create(modelData, () => {
      this.sweetAlertService.showMessage();
      this.shoeModelList.emit();
      form.reset();
    });
  }
}