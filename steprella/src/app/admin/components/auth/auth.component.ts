import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Login } from '../../../core/models/auth/login';
import { Icon, SweetAlertService } from '../../../core/services/common/sweet-alert.service';
import { AdminUserAuthService } from '../../../core/services/admin/admin-user-auth.service';
import { AuthService } from '../../../core/services/common/auth.service';
import { VerificationService } from '../../../core/services/common/verification-code.service';
import { switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit{
  private readonly formBuilder = inject(FormBuilder);
  private readonly adminUserAuthService = inject(AdminUserAuthService);
  private readonly authService = inject(AuthService);
  private readonly verificationService = inject(VerificationService);
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

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      void this.router.navigate(['/']);
    }
  }

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

    const loginData :Login = {
      email: this.authForm.value.email!,
      password: this.authForm.value.password!
    }

    this.adminUserAuthService.adminLogin(loginData).pipe(
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
        this.authService.deleteToken();
      }
    });
  }
}
