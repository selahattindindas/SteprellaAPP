import { Component, inject, signal, ViewChild } from '@angular/core';
import { AddressHeaderComponent } from "../../../pages/profile/addresses/address-header/address-header.component";
import { AddressCardComponent } from "../../../pages/profile/addresses/address-card/address-card.component";
import { CreateAddressComponent } from "../../../pages/profile/addresses/create-address/create-address.component";
import { ListAddress } from '../../../../core/models/addresses/list-address';
import { AddressService } from '../../../../core/services/ui/address.service';
import { ModalService, ModalWidth } from '../../../../core/services/common/modal.service';
import { UpdateAddressComponent } from '../../../pages/profile/addresses/update-address/update-address.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    AddressHeaderComponent,
    AddressCardComponent,
    CreateAddressComponent,
    UpdateAddressComponent
],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  private readonly addressService = inject(AddressService);
  private readonly modalService = inject(ModalService);
  @ViewChild(CreateAddressComponent) createAddressComponent!: CreateAddressComponent;
  @ViewChild(UpdateAddressComponent) UpdateAddressComponent!: UpdateAddressComponent;

  addresses = signal<ListAddress[]>([
    { id: 1, title: 'Evim', cityName: 'İstanbul', districtName: 'Kadıköy', description: 'Caferağa Mah. Moda Cad. No:123' },
    { id: 2, title: 'İş', cityName: 'İstanbul', districtName: 'Şişli', description: 'Mecidiyeköy Mah. Büyükdere Cad. No:456' },
    { id: 3, title: 'Yazlık', cityName: 'İzmir', districtName: 'Çeşme', description: 'Alaçatı Mah. Deniz Sok. No:789' },
    { id: 4, title: 'Aile', cityName: 'Ankara', districtName: 'Çankaya', description: 'Kızılay Mah. Atatürk Bulvarı No:321' },
    { id: 5, title: 'Ofis', cityName: 'İstanbul', districtName: 'Beşiktaş', description: 'Levent Mah. Plaza Sok. No:654' }
  ]);

  openCreateDialog() {
    this.modalService.open({
      component: CreateAddressComponent,
      width: ModalWidth.SM,
      data: {
        title: 'Yeni Adres Ekle'
      },
      onClose: (result) => {
        if (result) {
          console.log('Yeni adres eklendi:', result);
        }
      }
    });
  }

  openUpdateDialog(id: number) {
    this.modalService.open({
      component: UpdateAddressComponent,
      width: ModalWidth.SM,
      data: { id },
      onClose: (result) => {
        if (result) {
          console.log('Adres Güncellendi', result);
        }
      }
    })
  }
}
