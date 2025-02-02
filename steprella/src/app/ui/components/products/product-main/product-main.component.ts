import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageBannerComponent } from '../../../shared/page-banner/page-banner.component';

@Component({
  selector: 'app-product-main',
  imports: [RouterOutlet, PageBannerComponent],
  templateUrl: './product-main.component.html',
  styleUrl: './product-main.component.scss'
})
export class ProductMainComponent {

}
