import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateShoeModel } from '../../../../core/models/shoe-models/create-shoe-model';
import { ShoeModelService } from '../../../../core/services/common/shoe-model.service';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-create-shoe-model',
  imports: [FormsModule, MatFormField, MatInputModule],
  templateUrl: './create-shoe-model.component.html',
  styleUrl: './create-shoe-model.component.scss'
})
export class CreateShoeModelComponent {
  private readonly shoeModelService = inject(ShoeModelService);
  private readonly sweetAlertService = inject(SweetAlertService);

  @ViewChild('shoeModelForm') shoeModelForm!: NgForm;
  @Input() brandId!: number;
  @Output() shoeModelList = new EventEmitter<void>();

  createShoeModel!: CreateShoeModel;

  onSubmit() {
    if (!this.shoeModelForm.valid) return;

    this.createShoeModel = {
      name: this.shoeModelForm.value.name,
      brandId: this.brandId
    };

    this.shoeModelService.create(this.createShoeModel,
      () => {
        this.sweetAlertService.showMessage();
        this.shoeModelList.emit();
        this.shoeModelForm.reset();
      }
    );
  }
}