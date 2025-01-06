import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Login } from '../../../core/models/auth/login';
import { Icon, SweetAlertService } from '../../../core/services/common/sweet-alert.service';
import { AdminUserAuthService } from '../../../core/services/admin/admin-user-auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly adminUserAuthService = inject(AdminUserAuthService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly router = inject(Router);

  readonly authForm = this.formBuilder.group({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ],
      nonNullable: true
    })
  });

  readonly hide = signal(true);
  readonly isLoading = signal(false);

  readonly emailErrors = computed(() => {
    const control = this.authForm.get('email');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'E-posta zorunludur';
      if (control.errors['email']) return 'Geçerli bir e-posta adresi giriniz';
    }
    return null;
  });

  readonly passwordErrors = computed(() => {
    const control = this.authForm.get('password');
    if (control?.touched && control?.errors) {
      if (control.errors['required']) return 'Şifre zorunludur';
      if (control.errors['minlength']) return 'Şifre en az 6 karakter olmalıdır';
      if (control.errors['maxlength']) return 'Şifre en fazla 20 karakter olmalıdır';
    }
    return null;
  });

  togglePassword(event: MouseEvent): void {
    this.hide.update(state => !state);
    event.stopPropagation();
    event.preventDefault();
  }

  onSubmit(): void {
    if (!this.authForm.valid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const loginData: Login = {
      email: this.authForm.value.email!,
      password: this.authForm.value.password!
    };

    this.adminUserAuthService.adminLogin(loginData,
      () => {
        this.sweetAlertService.showMessage('Giriş Başarılı!', Icon.SUCCESS);
        this.router.navigate(['/admin']);
        this.isLoading.set(false);
      }
    );
  }
}
