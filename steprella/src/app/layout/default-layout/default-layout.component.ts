import { Component } from '@angular/core';
import { HeaderComponent } from "../default-layout/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-default-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
