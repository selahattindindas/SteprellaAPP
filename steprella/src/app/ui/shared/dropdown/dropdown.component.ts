import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, input, model, signal } from '@angular/core';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownComponent {
  options = input.required<DropdownOption[]>();
  value = model<string>();
  
  isOpen = signal(false);

  constructor(private elementRef: ElementRef) {}

  selectedLabel = computed(() => 
    this.options().find(opt => opt.value === this.value())?.label || 'Seçiniz'
  );

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.isOpen.set(false);
  }

  toggleDropdown(): void {
    this.isOpen.update(value => !value);
  }

  selectOption(value: string): void {
    this.value.set(value);
    this.isOpen.set(false);
  }
}