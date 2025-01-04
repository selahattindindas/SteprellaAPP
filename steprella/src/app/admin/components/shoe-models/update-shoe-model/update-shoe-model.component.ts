import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ShoeModelService } from '../../../../core/services/common/shoe-model.service';
import { UpdateShoeModel } from '../../../../core/models/shoe-models/update-shoe-model';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-update-shoe-model',
  imports: [FormsModule],
  templateUrl: './update-shoe-model.component.html',
  styleUrl: './update-shoe-model.component.scss'
})
export class UpdateShoeModelComponent {
  private readonly shoeModelService = inject(ShoeModelService);
  private readonly sweetAlertService = inject(SweetAlertService);

  @ViewChild('shoeModelForm') shoeModelForm!: NgForm;
  @Input() brandId!: number;
  @Input() shoeModelData!: any;
  @Output() shoeModelUpdated = new EventEmitter<number | null>();
  @Output() shoeModelList = new EventEmitter<void>();

  updateShoeModel!: UpdateShoeModel;

  ngOnInit(): void {
    if (this.shoeModelData) {
      this.updateShoeModel = { ...this.shoeModelData };
    }
  }

  onSubmit() {
    if (!this.shoeModelForm.valid) return;

    this.updateShoeModel = {
      id: this.shoeModelData.id,
      name: this.shoeModelForm.value.name,
      brandId: this.brandId
    };

    this.shoeModelService.update(this.updateShoeModel,
      () => {
        this.sweetAlertService.showMessage();
        this.shoeModelUpdated.emit(null);
        this.shoeModelList.emit();
      });
  }
}
