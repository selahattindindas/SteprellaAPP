import { Component } from '@angular/core';
import { BrandSlideComponent } from "../../shared/brands/brands/brand-slide/brand-slide.component";
import { RandomProductsComponent } from "../products/random-products/random-products.component";

@Component({
  selector: 'app-home',
  imports: [BrandSlideComponent, RandomProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
