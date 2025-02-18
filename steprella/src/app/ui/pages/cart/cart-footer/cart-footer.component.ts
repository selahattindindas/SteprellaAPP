import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface CartSummary {
  totalPrice: number;
  totalItems: number;
}

@Component({
  selector: 'app-cart-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-footer.component.html',
  styleUrl: './cart-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartFooterComponent {
  summary = input.required<CartSummary>();
}
