import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ProfileDetailHeaderComponent } from "../../../pages/profile/profile-detail/profile-detail-header/profile-detail-header.component";
import { ProfilePersonalFormComponent } from '../../../pages/profile/profile-detail/profile-detail-form/profile-personal-form/profile-personal-form.component';
import { ProfilePasswordFormComponent } from "../../../pages/profile/profile-detail/profile-detail-form/profile-password-form/profile-password-form.component";
import { UserService } from '../../../../core/services/ui/user.service';
import { ListUser } from '../../../../core/models/users/list-user';
import { AuthService } from '../../../../core/services/common/auth.service';
import { UpdateUser } from '../../../../core/models/users/update-user-';
import { UserAuthService } from '../../../../core/services/ui/user-auth.service';
import { Icon, SweetAlertService } from '../../../../core/services/common/sweet-alert.service';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [ProfileDetailHeaderComponent, ProfilePersonalFormComponent, ProfilePasswordFormComponent],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDetailComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly userAuthService = inject(UserAuthService);
  private readonly sweetAlertService = inject(SweetAlertService);

  userData= signal<ListUser | null>(null);

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    this.userService.getCurrentUserDetails().subscribe({
      next: (user) => {
        this.userData.set(user);
      }
    });
  }

  onSubmit(data:UpdateUser){
    this.userAuthService.update(data).subscribe({
      next:()=>{
        this.sweetAlertService.showMessage();
      },
      error: ()=>{
        this.sweetAlertService.showMessage("Bir hata oluştu", Icon.ERROR);
      }
    })
  }
}
