import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { CreateFileComponent } from "../create-file/create-file.component";
import { FileService } from '../../../../core/services/ui/file.service';
import { MAT_DIALOG_DATA,  MatDialogActions,  MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FilePipe } from '../../../../shared/pipes/file.pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ListProductFile } from '../../../../core/models/files/list-product-file';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminFileService } from '../../../../core/services/admin/admin-file.service';

@Component({
  selector: 'app-list-file',
  imports: [CommonModule, MatIconModule, CreateFileComponent, FilePipe, MatDialogTitle, MatDialogContent, MatDialogActions],
  standalone: true,
  templateUrl: './list-file.component.html',
  styleUrl: './list-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFileComponent {
  private readonly fileService = inject(FileService);
  private readonly adminFileService = inject(AdminFileService);
  private readonly sweetAlertService = inject(SweetAlertService);
  readonly dialogData = inject<{ productVariantId: number }>(MAT_DIALOG_DATA);

  readonly files = signal<ListProductFile | null>(null);

  constructor() {
    effect(() => {
      this.loadFiles();
    });
  }

  loadFiles(): void {
    this.fileService.getByProductVariantId(this.dialogData.productVariantId)
      .subscribe({
        next: (response) => this.files.set(response)
      });
  }

  delete(id: number): void {
    this.sweetAlertService.confirmation().then((result) => {
      if (result.isConfirmed) {
        this.adminFileService.delete(id, () => {
          this.sweetAlertService.showMessage();
          this.loadFiles();
        });
      }
    });
  }
}
