import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { WritableSignal } from '@angular/core';

@Component({
  selector: 'app-cart-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartHeaderComponent {
  isOpen = input.required<WritableSignal<boolean>>();
  totalCount = input<number>();
}
