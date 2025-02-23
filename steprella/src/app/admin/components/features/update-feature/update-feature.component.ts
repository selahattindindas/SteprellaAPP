import { ChangeDetectionStrategy, Component, effect, inject, input, model, output, viewChild } from '@angular/core';
import { AdminFeatureService } from '../../../../core/services/admin/admin-feature.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UpdateFeature } from '../../../../core/models/features/update-feature';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-update-feature',
  imports: [FormsModule, MatInputModule],
  standalone: true,
  templateUrl: './update-feature.component.html',
  styleUrl: './update-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateFeatureComponent {
  private readonly adminFeatureService = inject(AdminFeatureService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly featureForm = viewChild<NgForm>('featureForm');
  
  readonly featureData = input.required<any>();
  readonly featureUpdated = output<number | null>();
  readonly featureList = output<void>();

  readonly updateFeature = model<UpdateFeature>({
    id: null,
    name: ''
  });

  constructor() {
    effect(() => {
      if (this.featureData()) {
        this.updateFeature.set({ ...this.featureData() });
      }
    });
  }

  onSubmit(): void {
    const form = this.featureForm();
    if (!form?.valid) return;

    const update: UpdateFeature = {
      id: this.featureData().id,
      name: form.value.name
    };

    this.adminFeatureService.update(update, () => {
      this.sweetAlertService.showMessage();
      this.featureUpdated.emit(null);
      this.featureList.emit();
    });
  }
}
