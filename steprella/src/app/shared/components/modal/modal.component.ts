import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Type } from '@angular/core';
import { ModalService } from '../../../core/services/common/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  private modalService = inject(ModalService);
  
  get modalState() {
    return this.modalService.modalState;
  }

  get component(): Type<any> | null {
    return this.modalState().component || null;
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.close();
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.close();
    }
  }

  close(result?: any) {
    this.modalService.close(result);
  }
}