import { ChangeDetectionStrategy, Component, inject, model, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminUsageAreaService } from '../../../../core/services/admin/admin-usage-area.service';
import { CreateUsageArea } from '../../../../core/models/usage-areas/create-usage-area';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-create-usage-area',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDialogTitle, MatDialogContent, MatDialogActions,MatButtonModule],
  standalone: true,
  templateUrl: './create-usage-area.component.html',
  styleUrl: './create-usage-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUsageAreaComponent {
  private readonly adminUsageAreaService = inject(AdminUsageAreaService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly usageAreaForm = viewChild<NgForm>('usageAreaForm');

  readonly brandList = output<void>();
  
  readonly createUsageArea = model<CreateUsageArea>({
    name: ''
  });

  onSubmit(): void {
    const form = this.usageAreaForm();
    if (!form?.valid) return;

    this.adminUsageAreaService.create(
      { name: form.value.name },
      () => {
        this.sweetAlertService.showMessage();
        this.brandList.emit();
        form.reset();
      }
    );
  }
}
