import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SizeService } from '../../../../core/services/common/size.service';
import { UpdateSize } from '../../../../core/models/sizes/update-size';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-size',
  imports: [FormsModule,],
  standalone: true,
  templateUrl: './update-size.component.html',
  styleUrl: './update-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateSizeComponent implements OnInit {
  private readonly sizeService = inject(SizeService);

  @ViewChild('stockForm', { static: true }) stockForm!: NgForm;

  @Input() productVariantId!: number;
  @Input() sizeData!: any;
  @Output() sizeUpdated = new EventEmitter<number | null>();
  @Output() sizeList = new EventEmitter<void>();

  updateSize!: UpdateSize;

  ngOnInit(): void {
    if (this.sizeData) {
      this.updateSize = { ...this.sizeData };
    }
  }

  async update() {
    if (!this.stockForm.valid) return;

    const update: UpdateSize = {
      id: this.sizeData.id,
      productVariantId: this.productVariantId,
      stockQuantity: this.stockForm.value.stockQuantity,
    }

    await firstValueFrom(
      this.sizeService.update(update,
        () => {
          this.sizeUpdated.emit(null);
          this.sizeList.emit();
        },
        error => {
          console.log(error);
        })
    )
  }
}
