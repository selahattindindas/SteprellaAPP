import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../../core/services/common/auth.service';
import { Icon, SweetAlertService } from '../../../core/services/common/sweet-alert.service';
import { VerificationService } from '../../../core/services/common/verification-code.service';
import { Router } from '@angular/router';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-verify-code',
  imports: [
    CommonModule, 
    MatCardModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly verificationService = inject(VerificationService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly destroy$ = new Subject<void>();

  readonly verifyForm = this.buildVerifyForm();

  readonly timeLeft = signal<number>(120);
  readonly progress = signal<number>(100);
  readonly isTimerExpired = signal<boolean>(false);

  private startTimer(): void {
    this.timeLeft.set(120);
    this.progress.set(100);
    this.isTimerExpired.set(false);

    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const currentTime = this.timeLeft() - 1;
        this.timeLeft.set(currentTime);
        this.progress.set((currentTime / 120) * 100);

        if (currentTime <= 0) {
          this.isTimerExpired.set(true);
          this.destroy$.next();
        }
      });
  }

  private buildVerifyForm() {
    return this.formBuilder.group({
      code: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]{6}$')
        ],
        nonNullable: true
      })
    });
  }

  ngOnInit(): void {
    this.checkVerificationEmail();
    this.startTimer(); 
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkVerificationEmail(): void {
    if (!this.authService.getVerificationEmail()) {
      this.router.navigate(['/admin/login']);
    }
  }

  onSubmit(): void {
    if (!this.verifyForm.valid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    const verificationCode = this.verifyForm.get('code')?.value;
    const email = this.authService.getVerificationEmail();

    if (!verificationCode || !email) return;

    this.verificationService.verifyCode(verificationCode, email).subscribe({
      next: () => {
        this.authService.setVerified(true);
        this.sweetAlertService.showMessage('Doğrulama başarılı!', Icon.SUCCESS);
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.authService.deleteToken();
      }
    })
  }

  resendCode() {
    const email = this.authService.getVerificationEmail();
    if (!email) return;

    this.verificationService.resendCode(email).subscribe({
      next: () => {
        this.sweetAlertService.showMessage('Yeni kod gönderildi!', Icon.SUCCESS);
        this.startTimer(); 
      },
      error: () =>{
        this.sweetAlertService.showMessage('eMAİL YOK KANKS', Icon.ERROR)
      }
    })
  }

  cancel(): void {
    this.sweetAlertService.confirmation().then(result => {
      if (result.isConfirmed) {
        this.authService.deleteToken();
        this.router.navigate(['/admin/login']);
        this.sweetAlertService.showMessage('İşlem iptal edildi', Icon.INFO);
      }
    });
  }
}
