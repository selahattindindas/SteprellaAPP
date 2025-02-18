import { Component, computed, inject, signal, HostListener } from '@angular/core';
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
  isLoggedIn = computed(() => {
    return this.authService.isUserAuthenticated();
  });
  
  userEmail = computed(() => this.authService.getAuthState().currentUser?.fullName || '');

  logout() {
    this.authService.deleteToken();
  }

  @HostListener('document:keydown.escape')
  handleEscKey() {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const dropdownElement = (event.target as HTMLElement).closest('.user-dropdown');
    if (!dropdownElement) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.isOpen.update(value => !value);
  }
}
