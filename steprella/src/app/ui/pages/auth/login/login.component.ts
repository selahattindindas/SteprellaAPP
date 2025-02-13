import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../../../../core/services/ui/user-auth.service';
import { Login } from '../../../../core/models/auth/login';
import { AuthService } from '../../../../core/services/common/auth.service';
import { VerificationService } from '../../../../core/services/common/verification-code.service';
import { switchMap } from 'rxjs';
import { Icon, SweetAlertService } from '../../../../core/services/common/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly userService = inject(UserAuthService);
  private readonly authService = inject(AuthService);
  private readonly verificationService = inject(VerificationService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  showPassword = signal(false);

  readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData: Login = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }

    this.userService.login(loginData).pipe(
      switchMap(() => {
        this.authService.setVerificationEmail(loginData.email);
        return this.verificationService.sendVerificationCode(loginData.email);
      })
    ).subscribe({
      next: () => {
        this.sweetAlertService.showMessage('Doğrulama kodu gönderildi!', Icon.SUCCESS);
        this.router.navigate(['/verify-code']);
      },
      error: () => {
        this.sweetAlertService.showMessage('E posta veya şifre hatalı', Icon.ERROR);
        this.authService.deleteToken();
      }
    });
  }
}
