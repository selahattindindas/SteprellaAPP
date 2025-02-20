import { Component, input, output } from '@angular/core';
import { ListAddress } from '../../../../../core/models/addresses/list-address';

@Component({
  selector: 'app-address-card',
  standalone: true,
  templateUrl: './address-card.component.html',
  styleUrl: './address-card.component.scss'
})
export class AddressCardComponent {
  readonly address = input.required<ListAddress>();

  updateClick = output<number>();
  deleteClick = output<number>();
}
