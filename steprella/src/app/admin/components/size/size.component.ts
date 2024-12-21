import { ChangeDetectionStrategy, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { ListSize } from '../../../core/models/sizes/list-size';
import { SizeService } from '../../../core/services/common/size.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CreateSizeComponent } from './create-size/create-size.component';
import { UpdateSize } from '../../../core/models/sizes/update-size';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-size',
  imports: [MatButtonModule, MatTableModule, CommonModule, MatIconModule, CreateSizeComponent, FormsModule],
  standalone: true,
  templateUrl: './size.component.html',
  styleUrl: './size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SizeComponent implements OnInit {
  private readonly sizeService = inject(SizeService);

  @ViewChild('stockForm', { static: true }) stockForm!: NgForm;
  @Input() productVariantId!: number;

  dataSource = new MatTableDataSource<ListSize>([]);
  displayedColumns: string[] = ['id', 'sizeValue', 'stockQuantity', 'active', 'option'];

  editingStockId: number | null = null;

  ngOnInit(): void {
    this.getSize();
  }

  async getSize() {
    const data = await firstValueFrom(this.sizeService.getByProductVariantId(this.productVariantId));
    this.dataSource.data = data;
  }

  async update() {
    if (!this.stockForm.valid) return;

    const update: UpdateSize = {
      ...this.stockForm.value,
      id: this.editingStockId,
      productVariantId: this.productVariantId,
    }

    await firstValueFrom(
      this.sizeService.update(update,
        () => {
          this.editingStockId = null;
        },
        error => {
          console.log(error);
        })
    )
  }

  async delete(id: number) {
    await firstValueFrom(this.sizeService.delete(id, () => {
      console.log("Silindi");
      this.getSize();
    },
      error => {
        console.log(error);
      }));
  }

  editRow(rowId: number) {
    this.editingStockId = this.editingStockId === rowId ? null : rowId;
  }
}
