import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { AddressFormComponent } from '../../../../shared/address-form/address-form.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../../core/services/common/modal.service';
import { UpdateAddress } from '../../../../../core/models/addresses/update-address';
import { AddressService } from '../../../../../core/services/ui/address.service';
import { Icon, SweetAlertService } from '../../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-update-address',
  standalone: true,
  imports: [CommonModule, AddressFormComponent],
  templateUrl: './update-address.component.html',
  styleUrl: './update-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateAddressComponent {
  private modalService = inject(ModalService);
  private addressService = inject(AddressService);
  private readonly sweetAlertService = inject(SweetAlertService);

  readonly listAddress$ = this.addressService.getById(this.modalService.modalState().data?.id);

  onSubmit(formData: UpdateAddress) {
    this.addressService.update(formData).subscribe({
      next: () => {
        this.sweetAlertService.showMessage();
        this.modalService.close({ success: true });
      },
      error: () => {
        this.sweetAlertService.showMessage("Bir hata oluştu", Icon.ERROR);
        this.modalService.close({ success: false });
      }
    })
  }
}
