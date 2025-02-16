import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-personal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-personal-form.component.html',
  styleUrl: './profile-personal-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePersonalFormComponent {
  private readonly fb = inject(FormBuilder);

  private readonly daysCount = signal(31);
  readonly days = computed(() => 
    Array.from({ length: this.daysCount() }, (_, i) => i + 1)
  );

  readonly months = signal([
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ]);

  private readonly currentYear = signal(new Date().getFullYear());
  private readonly yearRange = signal(100);
  readonly years = computed(() => 
    Array.from(
      { length: this.yearRange() }, 
      (_, i) => this.currentYear() - i
    )
  );

  readonly profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)] ],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    phoneCode: ['+90', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    day: ['', [Validators.required]],
    month: ['', [Validators.required]],
    year: ['', [Validators.required]]
  });

  ngOnInit() {

  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    }
  }
}
