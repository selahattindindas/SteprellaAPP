import { CommonModule } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { SliderHeaderComponent } from '../../../shared/slider/slider-header/slider-header.component';
import { SpacingSliderComponent, SliderBreakpoint } from '../../../shared/slider/spacing-slider/spacing-slider.component';

interface BrandSlider {
  name: string;
  logo: string;
  route?: string;
}

@Component({
  selector: 'app-brand-slide',
  standalone: true,
  imports: [CommonModule, SpacingSliderComponent, SliderHeaderComponent],
  templateUrl: './brand-slide.component.html',
  styleUrl: './brand-slide.component.scss'
})
export class BrandSlideComponent {
  readonly slider = viewChild<SpacingSliderComponent>('slider');

  readonly brandList = signal<BrandSlider[]>([
    {name: 'adidas', logo: 'logo-adidas'},
    {name: 'nike', logo:'logo-nike'},
    {name: 'converse', logo:'logo-converse'},
    {name: 'hummel', logo:'logo-hummel'},
    {name: 'levis', logo:'logo-levis'},
    {name: 'lotto', logo:'logo-lotto'},
    {name: 'lumberjack', logo:'logo-lumberjack'},
    {name: 'puma', logo:'logo-puma'},
    {name: 'reebok', logo:'logo-reebok'},
    {name: 'under-armour', logo:'logo-under_armour'}
  ]);

  readonly sliderBreakpoints = signal< SliderBreakpoint[]>([
    { minWidth: 1440, perView: 6, spacing: 24 },
    { maxWidth: 1439, perView: 5, spacing: 20 },
    { maxWidth: 1200, perView: 4, spacing: 20 },
    { maxWidth: 992, perView: 3, spacing: 16 },
    { maxWidth: 768, perView: 2, spacing: 16 },
    { maxWidth: 480, perView: 1, spacing: 16 }
  ]); 

  nextSlide() {
    this.slider()?.slider?.next();
  }

  prevSlide() {
    this.slider()?.slider?.prev();
  }
}