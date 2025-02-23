import { ChangeDetectionStrategy, Component, inject, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminFeatureService } from '../../../../core/services/admin/admin-feature.service';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { CreateFeature } from '../../../../core/models/features/create-feature';

@Component({
  selector: 'app-create-feature',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDialogTitle, MatDialogContent, MatDialogActions,MatButtonModule],
  standalone: true,
  templateUrl: './create-feature.component.html',
  styleUrl: './create-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFeatureComponent {
  private readonly adminFeatureService = inject(AdminFeatureService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly featureForm = viewChild<NgForm>('featureForm');

  readonly brandList = output<void>();
  
  readonly createFeature = model<CreateFeature>({
    name: ''
  });

  onSubmit(): void {
    const form = this.featureForm();
    if (!form?.valid) return;

    this.adminFeatureService.create(
      { name: form.value.name },
      () => {
        this.sweetAlertService.showMessage();
        this.brandList.emit();
        form.reset();
      }
    );
  }
}
