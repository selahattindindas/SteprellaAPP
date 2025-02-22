import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListUser } from '../../../../../../core/models/users/list-user';

@Component({
  selector: 'app-profile-personal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-personal-form.component.html',
  styleUrl: './profile-personal-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePersonalFormComponent implements OnChanges {
  private readonly fb = inject(FormBuilder);

  userData = input<ListUser | null>(null);
  itemSubmit = output<any>();

  readonly profileForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    gender: ['', Validators.required],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && this.userData) {
      this.profileForm.patchValue({
        fullName: this.userData()?.fullName || '',
        phone: this.userData()?.phone.slice(-10) || '',
        gender: this.userData()?.gender || null
      });
    }
  }

  selectGender(gender: 'M' | 'F') {
    this.profileForm.patchValue({ gender });
  }

  onSubmit() {
    if (!this.profileForm.valid) return;

    const formData = this.profileForm.value;
    const submitData = {
      fullName: formData.fullName || '',
      phone: formData.phone || '',
      gender: formData.gender as 'M' | 'F'
    };


    this.itemSubmit.emit(submitData);
  }
}
