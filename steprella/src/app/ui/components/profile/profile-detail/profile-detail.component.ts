import { Component } from '@angular/core';
import { ProfileDetailHeaderComponent } from "../../../pages/profile/profile-detail/profile-detail-header/profile-detail-header.component";
import { ProfilePersonalFormComponent } from '../../../pages/profile/profile-detail/profile-detail-form/profile-personal-form/profile-personal-form.component';
import { ProfilePasswordFormComponent } from "../../../pages/profile/profile-detail/profile-detail-form/profile-password-form/profile-password-form.component";

@Component({
  selector: 'app-profile-detail',
  imports: [ProfileDetailHeaderComponent, ProfilePersonalFormComponent, ProfilePasswordFormComponent],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.scss'
})
export class ProfileDetailComponent {

}
