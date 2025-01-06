import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, Input, output, Output, signal, viewChild, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CreateFile } from '../../../../core/models/files/create-file';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { AdminFileService } from '../../../../core/services/admin/admin-file.service';

@Component({
  selector: 'app-create-file',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './create-file.component.html',
  styleUrl: './create-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFileComponent {
  private readonly adminFileService = inject(AdminFileService);
  private readonly sweetAlertService = inject(SweetAlertService);
  
  readonly fileForm = viewChild<NgForm>('fileForm');

  readonly productVariantId = input.required<number>();
  readonly fileList = output<void>();

  readonly selectedFiles = signal<File[]>([]);

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles.set(Array.from(inputElement.files));
    }
  }

  onUpload(): void {
    const files = this.selectedFiles();
    if (files.length === 0 || !this.fileForm()?.valid) return;

    const fileData: CreateFile[] = files.map(file => ({
      productVariantId: this.productVariantId(),
      files: [file]
    }));

    this.adminFileService.create(fileData, () => {
      this.sweetAlertService.showMessage();
      this.selectedFiles.set([]);
      this.fileList.emit();
    });
  }

  removePhoto(index: number): void {
    this.selectedFiles.update(files => {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      return newFiles;
    });
  }
}
