import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Login } from '../../../core/models/auth/login';
import { UserAuthService } from '../../../core/services/common/user-auth.service';
import { Icon, SweetAlertService } from '../../../core/services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userAuthService = inject(UserAuthService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly router = inject(Router);

  protected readonly authForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  hide = signal(true);
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
    event.preventDefault();
  }

  login() {
    if (!this.authForm.valid) return;

    const formData = this.authForm.value;
    const loginData: Login = {
      email: formData.email!,
      password: formData.password!,
    };
    
    this.userAuthService.adminLogin(loginData, 
      () => {
          this.sweetAlertService.showMessage('Giriş Başarılı!', Icon.SUCCESS);
          this.router.navigate(['/admin']);
    });
  }
}
