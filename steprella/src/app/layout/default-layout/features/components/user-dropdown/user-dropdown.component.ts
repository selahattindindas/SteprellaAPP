import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../../core/services/common/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.scss'
})
export class UserDropdownComponent {
  private readonly authService = inject(AuthService);
  
  isOpen = signal(false);
  isLoggedIn = computed(() => this.authService.isUserAuthenticated());
  userEmail = computed(() => this.authService.getAuthState().currentUser?.fullName || '');

  logout() {
    this.authService.deleteToken();
    this.isOpen.set(false);
  }
}
