import { Component } from '@angular/core';
import { HeaderComponent } from "../default-layout/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default-layout',
  imports: [HeaderComponent, RouterOutlet],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss'
})
export class DefaultLayoutComponent {

}
