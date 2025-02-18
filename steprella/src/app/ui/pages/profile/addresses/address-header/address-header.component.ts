import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-address-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './address-header.component.html',
  styleUrl: './address-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressHeaderComponent {
  createClick = output<void>();
}
