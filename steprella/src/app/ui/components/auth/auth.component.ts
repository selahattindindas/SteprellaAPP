import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { RegisterComponent } from '../../pages/auth/register/register.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../core/services/common/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  authType$ = this.route.queryParams.pipe(
    map(params => params['type'] || 'login')
  );

  ngOnInit() {
    if (this.authService.isUserAuthenticated()) {
        void this.router.navigate(['/']);
        return;
    }

    const currentType = this.route.snapshot.queryParams['type'];
    if (!currentType) {
        void this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { type: 'login' },
            replaceUrl: true
        });
    }
  }

  switchAuth(type: 'login' | 'register') {
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { type },
      queryParamsHandling: 'merge'
    });
  }
}
