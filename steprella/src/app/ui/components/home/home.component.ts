import { Component } from '@angular/core';
import { RandomProductsComponent } from "../products/random-products/random-products.component";
import { BannerComponent } from "../../pages/home/banner/banner.component";
import { TechnologyComponent } from "../../pages/home/technology/technology.component";
import { BrandSlideComponent } from '../../pages/home/brand-slide/brand-slide.component';

@Component({
  selector: 'app-home',
  imports: [BrandSlideComponent, RandomProductsComponent, BannerComponent, TechnologyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
