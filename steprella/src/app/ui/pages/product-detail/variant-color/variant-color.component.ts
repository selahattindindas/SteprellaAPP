import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { SliderHeaderComponent } from '../../../shared/slider/slider-header/slider-header.component';
import { SpacingSliderComponent } from '../../../shared/slider/spacing-slider/spacing-slider.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-variant-color',
  standalone: true,
  imports: [CommonModule, SpacingSliderComponent, SliderHeaderComponent,],
  templateUrl: './variant-color.component.html',
  styleUrl: './variant-color.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariantColorComponent {
  readonly slider = viewChild<SpacingSliderComponent>('slider');
  readonly images = [
    { id: 1, path: 'assets/images/ui/shoe1.png' },
    { id: 2, path: 'assets/images/ui/shoe1.png' },
    { id: 3, path: 'assets/images/ui/shoe1.png' },
    { id: 4, path: 'assets/images/ui/shoe1.png' }
  ];

  nextSlide() {
    this.slider()?.slider?.next();
  }

  prevSlide() {
    this.slider()?.slider?.prev();
  }
}
