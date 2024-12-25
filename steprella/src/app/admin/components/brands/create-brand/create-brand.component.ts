import { Component, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { BrandService } from '../../../../core/services/common/brand.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateBrand } from '../../../../core/models/brands/create-brand';
import { firstValueFrom } from 'rxjs';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-create-brand',
  imports: [FormsModule, MatFormField, MatInputModule],
  standalone: true,
  templateUrl: './create-brand.component.html',
  styleUrl: './create-brand.component.scss'
})
export class CreateBrandComponent {
  private readonly brandService = inject(BrandService);
  private readonly sweetAlertService = inject(SweetAlertService);

  @ViewChild('brandForm') brandForm!: NgForm;
  @Output() brandList = new EventEmitter<void>();
  
  createBrand!: CreateBrand;

  async onSubmit() {
    if (!this.brandForm.valid) return;

    this.createBrand = {
      name: this.brandForm.value.name
    };

    await firstValueFrom(this.brandService.create(this.createBrand,
      () => {
        this.sweetAlertService.showMessage();
        this.brandList.emit();
        this.brandForm.reset();
      },
      error => {
      }
    ));
  }
}
