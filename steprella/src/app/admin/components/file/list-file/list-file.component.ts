import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CreateFileComponent } from "../create-file/create-file.component";
import { FileService } from '../../../../core/services/common/file.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FilePipe } from '../../../../shared/pipes/file.pipe';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { ListProductFile } from '../../../../core/models/files/list-product-file';
import { SweetAlertService } from '../../../../core/services/sweet-alert.service';

@Component({
  selector: 'app-list-file',
  imports: [CommonModule, MatIconModule, CreateFileComponent, FilePipe, MatDialogTitle, MatDialogContent, MatDialogActions],
  standalone: true,
  templateUrl: './list-file.component.html',
  styleUrl: './list-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListFileComponent implements OnInit {
  private readonly fileService = inject(FileService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly data = inject<{ productVariantId: number }>(MAT_DIALOG_DATA);

  listFile$: Observable<ListProductFile | null> | undefined;

  ngOnInit(): void {
    this.getFile();
  }

  getFile() {
    this.listFile$ = this.fileService.getByProductVariantId(this.data.productVariantId);
  }

  async delete(id: number): Promise<void> {
    const sweetAlertResult = await this.sweetAlertService.confirmation();
    if (sweetAlertResult.isConfirmed) {
      this.fileService.delete(id,
        () => {
          this.sweetAlertService.showMessage();
          this.getFile();
        }
      )}
  }
}
