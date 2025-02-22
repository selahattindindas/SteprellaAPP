import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-cart-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-footer.component.html',
  styleUrl: './cart-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartFooterComponent {
  totalPrice = input<number>();
}
