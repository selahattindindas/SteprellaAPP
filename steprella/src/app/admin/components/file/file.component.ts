import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../../../core/services/common/file.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProductFile } from '../../../core/models/files/list-product-file';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { CreateFile } from '../../../core/models/files/create-file';
import { MatIconModule } from '@angular/material/icon';
import { FilePipe } from '../../../shared/pipes/file.pipe';

@Component({
  selector: 'app-file',
  imports: [CommonModule, FormsModule, MatIconModule, FilePipe],
  standalone: true,
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  @ViewChild("fileForm", { static: true }) fileForm!: NgForm;
  @Input() productVariantId!: number;
  selectedFiles: File[] = [];
  private readonly cdr = inject(ChangeDetectorRef);  
  private readonly fileService = inject(FileService);
  listFile$: Observable<ListProductFile> | undefined;

  ngOnInit(): void {
    this.getByProductVariantId();
  }

  getByProductVariantId() {
    this.listFile$ = this.fileService.getByProductVariantId(this.productVariantId);
  }

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
          this.getByProductVariantId();
          this.cdr.detectChanges();
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

  async delete(id: number): Promise<void> {
    await firstValueFrom(this.fileService.delete(id));
    this.getByProductVariantId();
    this.cdr.detectChanges();
  }
}
