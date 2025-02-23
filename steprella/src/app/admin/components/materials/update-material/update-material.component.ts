import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, viewChild } from '@angular/core';
import { AdminMaterialService } from '../../../../core/services/admin/admin-material.service';
import { UpdateMaterial } from '../../../../core/models/materials/update-material';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-update-material',
  imports: [FormsModule, MatInputModule],
  standalone: true,
  templateUrl: './update-material.component.html',
  styleUrl: './update-material.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateMaterialComponent {
  private readonly adminMaterialService = inject(AdminMaterialService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly materialForm = viewChild<NgForm>('materialForm');
  
  readonly materialData = input.required<any>();
  readonly materialUpdated = output<number | null>();
  readonly materialList = output<void>();

  readonly updateMaterial = model<UpdateMaterial>({
    id: null,
    name: ''
  });

  constructor() {
    effect(() => {
      if (this.materialData()) {
        this.updateMaterial.set({ ...this.materialData() });
      }
    });
  }

  onSubmit(): void {
    const form = this.materialForm();
    if (!form?.valid) return;

    const update: UpdateMaterial = {
      id: this.materialData().id,
      name: form.value.name
    };

    this.adminMaterialService.update(update, () => {
      this.sweetAlertService.showMessage();
      this.materialUpdated.emit(null);
      this.materialList.emit();
    });
  }
}
