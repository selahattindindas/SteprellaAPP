import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, viewChild, signal, computed, effect } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { CreateSizeComponent } from "../create-size/create-size.component";
import { ListSize } from "../../../../core/models/sizes/list-size";
import { SizeService } from "../../../../core/services/ui/size.service";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from "@angular/material/dialog";
import { UpdateSizeComponent } from "../update-size/update-size.component";
import { SweetAlertService } from "../../../../core/services/common/sweet-alert.service";
import { AdminSizeService } from "../../../../core/services/admin/admin-size.service";

@Component({
  selector: 'app-list-size',
  imports: [
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatIconModule,
    CreateSizeComponent,
    UpdateSizeComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions
  ],
  standalone: true,
  templateUrl: './list-size.component.html',
  styleUrl: './list-size.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListSizeComponent {
  private readonly adminSizeService = inject(AdminSizeService);
  private readonly sizeService = inject(SizeService);
  private readonly sweetAlertService = inject(SweetAlertService);
  readonly dialogData = inject<{ productVariantId: number }>(MAT_DIALOG_DATA);

  readonly updateSizeComponent = viewChild(UpdateSizeComponent);

  readonly dataSource = signal<MatTableDataSource<ListSize>>(new MatTableDataSource());
  readonly editingStockId = signal<number | null>(null);
  readonly productVariantId = computed(() => this.dialogData.productVariantId);

  readonly displayedColumns = ['id', 'sizeValue', 'stockQuantity', 'active', 'option'] as const;

  constructor() {
    effect(() => {
      this.loadSizes();
    });
  }

  loadSizes(): void {
    this.sizeService.getByProductVariantId(this.productVariantId())
      .subscribe({
        next: (response) => {
          this.dataSource.update(ds => {
            ds.data = response;
            return ds;
          });
        }
      });
  }

  delete(id: number) {
    this.sweetAlertService.confirmation().then((result) => {
      if (result.isConfirmed) {
        this.adminSizeService.delete(id, () => {
          this.sweetAlertService.showMessage();
          this.loadSizes();
        });
      }
    })
  }

  editRow(rowId: number) {
    this.editingStockId.set(this.editingStockId() === rowId ? null : rowId);
  }

  submitUpdate() {
    if (this.updateSizeComponent()) {
      this.updateSizeComponent()?.onSubmit();
    }
  }
}
