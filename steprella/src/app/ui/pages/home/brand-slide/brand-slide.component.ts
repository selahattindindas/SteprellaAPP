import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { SliderHeaderComponent } from '../../../shared/slider/slider-header/slider-header.component';
import { SpacingSliderComponent, SliderBreakpoint } from '../../../shared/slider/spacing-slider/spacing-slider.component';

interface BrandSlider {
  id: number;
  name: string;
  logo: string;
}

@Component({
  selector: 'app-brand-slide',
  standalone: true,
  imports: [CommonModule, SpacingSliderComponent, SliderHeaderComponent],
  templateUrl: './brand-slide.component.html',
  styleUrl: './brand-slide.component.scss'
})
export class BrandSlideComponent {
  private router = inject(Router);
  readonly slider = viewChild<SpacingSliderComponent>('slider');
  readonly forceUpdateTrigger = signal<number>(0);

  readonly brandList = signal<BrandSlider[]>([
    {id: 1, name: 'adidas', logo: 'logo-adidas'},
    {id: 2, name: 'nike', logo:'logo-nike'},
    {id: 3, name: 'converse', logo:'logo-converse'},
    {id: 4, name: 'hummel', logo:'logo-hummel'},
    {id: 5, name: 'levis', logo:'logo-levis'},
    {id: 6, name: 'lotto', logo:'logo-lotto'},
    {id: 7, name: 'lumberjack', logo:'logo-lumberjack'},
    {id: 8, name: 'puma', logo:'logo-puma'},
    {id: 9, name: 'reebok', logo:'logo-reebok'},
    {id: 10, name: 'under-armour', logo:'logo-under_armour'}
  ]);

  readonly sliderBreakpoints = signal< SliderBreakpoint[]>([
    { minWidth: 1440, perView: 6, spacing: 24 },
    { maxWidth: 1439, perView: 5, spacing: 20 },
    { maxWidth: 1200, perView: 4, spacing: 20 },
    { maxWidth: 992, perView: 3, spacing: 16 },
    { maxWidth: 768, perView: 2, spacing: 16 },
    { maxWidth: 480, perView: 1, spacing: 16 }
  ]); 

  ngOnInit() {
    setTimeout(() => {
      this.forceUpdateTrigger.set(Date.now());
    });
  }

  nextSlide() {
    this.slider()?.slider?.next();
  }

  prevSlide() {
    this.slider()?.slider?.prev();
  }

  navigateToBrand(brand: BrandSlider) {
    this.router.navigate(['/brands'], {
      queryParams: { brandId: brand.id }
    });
  }
}