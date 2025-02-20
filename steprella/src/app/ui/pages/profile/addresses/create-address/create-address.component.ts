import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { ModalService } from '../../../../../core/services/common/modal.service';
import { AddressFormComponent } from "../../../../shared/address-form/address-form.component";
import { CreateAddress } from '../../../../../core/models/addresses/create-address';
import { AddressService } from '../../../../../core/services/ui/address.service';
import { Icon, SweetAlertService } from '../../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-create-address',
  standalone: true,
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAddressComponent {
  private readonly modalService = inject(ModalService);
  private readonly addressService = inject(AddressService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly addressList = output<void>();

  onSubmit(formData: CreateAddress) {
    this.addressService.create(formData).subscribe({
      next: () => {
        this.sweetAlertService.showMessage();
        this.modalService.close({ success: true });
      },
      error: () => {
        this.sweetAlertService.showMessage("Bir hata oluştu", Icon.ERROR);
        this.modalService.close({ success: false });
      }
    });
  }
}
