import { ChangeDetectionStrategy, Component, inject, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminMaterialService } from '../../../../core/services/admin/admin-material.service';
import { CreateMaterial } from '../../../../core/models/materials/create-material';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-create-material',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDialogTitle, MatDialogContent, MatDialogActions,MatButtonModule],
  standalone: true,
  templateUrl: './create-material.component.html',
  styleUrl: './create-material.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMaterialComponent {
  private readonly adminMaterialService = inject(AdminMaterialService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly materialForm = viewChild<NgForm>('materialForm');

  readonly materialList = output<void>();
  
  readonly createMaterial = model<CreateMaterial>({
    name: ''
  });

  onSubmit(): void {
    const form = this.materialForm();
    if (!form?.valid) return;

    this.adminMaterialService.create(
      { name: form.value.name },
      () => {
        this.sweetAlertService.showMessage();
        this.materialList.emit();
        form.reset();
      }
    );
  }
}
