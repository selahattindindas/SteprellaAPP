import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalComponent } from '../../../../../shared/components/modal/modal.component';
import { AddressFormComponent } from '../../../../shared/address-form/address-form.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../../../core/services/common/modal.service';
import { UpdateAddress } from '../../../../../core/models/addresses/update-address';
import { AddressService } from '../../../../../core/services/ui/address.service';

@Component({
  selector: 'app-update-address',
  standalone: true,
  imports: [CommonModule, ModalComponent, AddressFormComponent],
  templateUrl: './update-address.component.html',
  styleUrl: './update-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateAddressComponent {
  private modalService = inject(ModalService);
  private addressService = inject(AddressService);

  readonly listAddress$ = this.addressService.getById(this.modalService.modalState().data?.id);

  onSubmit(formData: UpdateAddress) {

    this.modalService.close({ success: true });
  }

  onCancel() {
    this.modalService.close();
  }
}
