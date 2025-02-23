import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, viewChild } from '@angular/core';
import { AdminUsageAreaService } from '../../../../core/services/admin/admin-usage-area.service';
import { UpdateUsageArea } from '../../../../core/models/usage-areas/update-usage-area';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-update-usage-area',
  imports: [FormsModule, MatInputModule],
  standalone: true,
  templateUrl: './update-usage-area.component.html',
  styleUrl: './update-usage-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUsageAreaComponent {
  private readonly adminUsageAreaService = inject(AdminUsageAreaService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly usageAreaForm = viewChild<NgForm>('usageAreaForm');
  
  readonly usageAreaData = input.required<any>();
  readonly usageAreaUpdated = output<number | null>();
  readonly usageAreaList = output<void>();

  readonly updateUsageArea = model<UpdateUsageArea>({
    id: null,
    name: ''
  });

  constructor() {
    effect(() => {
      if (this.usageAreaData()) {
        this.updateUsageArea.set({ ...this.usageAreaData() });
      }
    });
  }

  onSubmit(): void {
    const form = this.usageAreaForm();
    if (!form?.valid) return;

    const update: UpdateUsageArea = {
      id: this.usageAreaData().id,
      name: form.value.name
    };

    this.adminUsageAreaService.update(update, () => {
      this.sweetAlertService.showMessage();
      this.usageAreaUpdated.emit(null);
      this.usageAreaList.emit();
    });
  }
}
