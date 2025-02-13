import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../../core/services/ui/user-auth.service';
import { Icon, SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { Register } from '../../../../core/models/auth/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly userService = inject(UserAuthService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly fb = inject(FormBuilder);

  showPassword = signal(false);

  readonly registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const registerData: Register = {
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      fullName: this.registerForm.value.fullName!,
      phone: this.registerForm.value.phone!,
      gender: this.registerForm.value.gender!,
    }

    this.userService.register(registerData).subscribe({
      next: () => {
        this.sweetAlertService.showMessage('Doğrulama kodu gönderildi!', Icon.SUCCESS);
      },
      error: () => {
        this.sweetAlertService.showMessage('Bir hata oluştu', Icon.ERROR);
      }
    });
  }
}
