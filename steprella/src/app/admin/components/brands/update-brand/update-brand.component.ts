import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { BrandService } from '../../../../core/services/common/brand.service';
import { UpdateBrand } from '../../../../core/models/brands/update-brand';
import { firstValueFrom } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-update-brand',
  imports: [FormsModule, MatInputModule],
  standalone: true,
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateBrandComponent implements OnInit {
  private readonly brandService = inject(BrandService);
  private readonly sweetAlertService = inject(SweetAlertService);

  @ViewChild('brandForm') brandForm!: NgForm;
  @Input() brandData!: any;
  @Output() brandUpdated = new EventEmitter<number | null>();
  @Output() brandList = new EventEmitter<void>();

  updateBrand!: UpdateBrand;

  ngOnInit(): void {
    if (this.brandData) {
      this.updateBrand = { ...this.brandData };
    }
  }

  async onSubmit() {
    if (!this.brandForm.valid) return;

    this.updateBrand = {
      id: this.brandData.id,
      name: this.brandForm.value.name
    }

    await firstValueFrom(
      this.brandService.update(this.updateBrand,
        () => {
          this.brandUpdated.emit(null);
          this.brandList.emit();
          this.sweetAlertService.showMessage();
        },
        error => {
        })
    )
  }
}
