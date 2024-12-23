import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FileService } from '../../../../core/services/common/file.service';
import { firstValueFrom } from 'rxjs';
import { CreateFile } from '../../../../core/models/files/create-file';

@Component({
  selector: 'app-create-file',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './create-file.component.html',
  styleUrl: './create-file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFileComponent {
  private readonly fileService = inject(FileService);
  
  @ViewChild("fileForm", { static: true }) fileForm!: NgForm;
  @Input() productVariantId!: number;
  @Output() fileList = new EventEmitter<void>();

  selectedFiles: File[] = [];

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFiles = Array.from(inputElement.files);
    }
  }

  async onUpload() {
    if (this.selectedFiles.length === 0 && this.fileForm.valid) return;
  
    const file: CreateFile[] = this.selectedFiles.map(name => ({
      productVariantId: this.productVariantId,
      files: [name]
    }));
  
    await firstValueFrom(
      this.fileService.create(file, 
        () => {
          console.log("Başarıyla eklendi");
          this.selectedFiles = [];
          this.fileList.emit();
        }, 
        (error) => {
          console.log(error);
        }
      )
    );
  }

  removePhoto(index: number) {
    if (index >= 0 && index < this.selectedFiles.length) {
      this.selectedFiles.splice(index, 1);
    }
  }
}
