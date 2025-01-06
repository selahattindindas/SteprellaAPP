import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UpdateShoeModel } from '../../../../core/models/shoe-models/update-shoe-model';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminShoeModelService } from '../../../../core/services/admin/admin-shoe-model.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-shoe-model',
  imports: [FormsModule, MatInputModule],
  standalone: true,
  templateUrl: './update-shoe-model.component.html',
  styleUrl: './update-shoe-model.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateShoeModelComponent {
  private readonly adminShoeModelService = inject(AdminShoeModelService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly brandId = input.required<number>();
  readonly shoeModelData = input.required<any>();
  readonly shoeModelUpdated = output<number | null>();
  readonly shoeModelList = output<void>();

  readonly shoeModelForm = viewChild<NgForm>('shoeModelForm');

  readonly updateShoeModel = model<UpdateShoeModel>({
    id: null,
    brandId: null,
    name: null
  });

  constructor() {
    effect(() => {
      if (this.shoeModelData()) {
        this.updateShoeModel.set({ ...this.shoeModelData() });
      }
    });
  }

  onSubmit(): void {
    const form = this.shoeModelForm();
    if (!form?.valid) return;

    const modelData: UpdateShoeModel = {
      id: this.shoeModelData().id,
      name: form.value.name,
      brandId: this.brandId()
    };

    this.adminShoeModelService.update(modelData, () => {
      this.sweetAlertService.showMessage();
      this.shoeModelUpdated.emit(null);
      this.shoeModelList.emit();
    });
  }
}
