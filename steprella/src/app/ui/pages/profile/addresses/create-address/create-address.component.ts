import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ModalService } from '../../../../../core/services/common/modal.service';
import { ModalComponent } from "../../../../../shared/components/modal/modal.component";
import { AddressFormComponent } from "../../../../shared/address-form/address-form.component";
import { CreateAddress } from '../../../../../core/models/addresses/create-address';
import { AddressService } from '../../../../../core/services/ui/address.service';

@Component({
  selector: 'app-create-address',
  standalone: true,
  imports: [CommonModule, ModalComponent, AddressFormComponent],
  templateUrl: './create-address.component.html',
  styleUrl: './create-address.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAddressComponent {
  private readonly modalService = inject(ModalService);
  private readonly addressService = inject(AddressService);

  onSubmit(formData: CreateAddress) {

    this.modalService.close({ success: true });
  }

  onCancel() {
    this.modalService.close();
  }
}
