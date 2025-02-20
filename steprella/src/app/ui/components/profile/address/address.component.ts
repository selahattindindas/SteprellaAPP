import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AddressHeaderComponent } from "../../../pages/profile/addresses/address-header/address-header.component";
import { AddressCardComponent } from "../../../pages/profile/addresses/address-card/address-card.component";
import { CreateAddressComponent } from "../../../pages/profile/addresses/create-address/create-address.component";
import { ListAddress } from '../../../../core/models/addresses/list-address';
import { AddressService } from '../../../../core/services/ui/address.service';
import { ModalService, ModalWidth } from '../../../../core/services/common/modal.service';
import { UpdateAddressComponent } from '../../../pages/profile/addresses/update-address/update-address.component';
import { SweetAlertService } from '../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    AddressHeaderComponent,
    AddressCardComponent
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit {
  private readonly addressService = inject(AddressService);
  private readonly modalService = inject(ModalService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly listAddress = signal<ListAddress[]>([]);

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses() {
    this.addressService.getAll().subscribe({
      next: (response) => {
        this.listAddress.set(response);
      },
    });
  }

  deleteAddress(id: number) {
    this.sweetAlertService.confirmation().then(result => {
      if (result.isConfirmed) {
        this.addressService.delete(id).subscribe({
          next: () => {
            this.sweetAlertService.showMessage();
            this.loadAddresses();
          }
        })
      }
    })
  }

  openCreateDialog() {
    this.modalService.open({
      title: 'Adres Ekle',
      component: CreateAddressComponent,
      width: ModalWidth.SM,
      onClose: (result) => {
        if (result?.success) {
          this.loadAddresses();
        }
      }
    });
  }

  openUpdateDialog(id: number) {
    this.modalService.open({
      title: 'Adres Düzenle',
      component: UpdateAddressComponent,
      width: ModalWidth.SM,
      data: { id },
      onClose: (result) => {
        if (result?.success) {
          this.loadAddresses();
        }
      }
    });
  }
}
