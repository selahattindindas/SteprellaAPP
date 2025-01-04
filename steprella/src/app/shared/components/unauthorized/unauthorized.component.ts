import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="unauthorized-container">
      <mat-icon class="error-icon">error_outline</mat-icon>
      <h1>Yetkisiz Erişim</h1>
      <p>Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
      <button mat-raised-button color="primary" routerLink="/auth">
        Giriş Sayfasına Dön
      </button>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      background-color: #f5f5f5;
    }

    .error-icon {
      font-size: 64px;
      height: 64px;
      width: 64px;
      color: #f44336;
      margin-bottom: 16px;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 16px;
      color: #333;
    }

    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 24px;
    }

    button {
      min-width: 200px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnauthorizedComponent {} 