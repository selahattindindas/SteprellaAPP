import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { CreateSizeComponent } from "../create-size/create-size.component";
import { firstValueFrom } from "rxjs";
import { ListSize } from "../../../../core/models/sizes/list-size";
import { SizeService } from "../../../../core/services/common/size.service";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { UpdateSizeComponent } from "../update-size/update-size.component";


@Component({
  selector: 'app-list-size',
  imports: [MatButtonModule, MatTableModule, CommonModule, MatIconModule, CreateSizeComponent, UpdateSizeComponent, MatDialogTitle, MatDialogContent, MatDialogActions],
  standalone: true,
  templateUrl: './list-size.component.html',
  styleUrl: './list-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSizeComponent implements OnInit {
  private readonly sizeService = inject(SizeService);
  readonly data = inject<{ productVariantId: number }>(MAT_DIALOG_DATA);

  dataSource = new MatTableDataSource<ListSize>([]);
  displayedColumns: string[] = ['id', 'sizeValue', 'stockQuantity', 'active', 'option'];

  editingStockId: number | null = null;

  ngOnInit(): void {
    this.getSize();
  }

  async getSize() {
    const data = await firstValueFrom(this.sizeService.getByProductVariantId(this.data.productVariantId));
    this.dataSource.data = data;
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
