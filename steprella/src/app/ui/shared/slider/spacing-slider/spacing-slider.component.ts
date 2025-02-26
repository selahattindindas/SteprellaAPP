import { isPlatformBrowser, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID, input, viewChild, OnChanges, SimpleChanges } from '@angular/core';
import KeenSlider, { KeenSliderInstance, KeenSliderOptions } from "keen-slider";

export interface SliderBreakpoint {
  minWidth?: number;
  maxWidth?: number;
  perView: number;
  spacing: number;
}

@Component({
  selector: 'app-spacing-slider',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './spacing-slider.component.html',
  styleUrl: './spacing-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpacingSliderComponent implements OnChanges {
  private readonly platformId = inject(PLATFORM_ID);
  readonly sliderRef = viewChild<ElementRef<HTMLElement>>("sliderRef");
  
  readonly breakpoints = input<SliderBreakpoint[]>();
  readonly defaultPerView = input<number>(4);
  readonly defaultSpacing = input<number>(24);
  readonly forceUpdate = input<any>();

  slider: KeenSliderInstance | undefined;

  private createBreakpointConfig(): KeenSliderOptions['breakpoints'] {
    const breakpointConfig: KeenSliderOptions['breakpoints'] = {};
    
    this.breakpoints()?.forEach(bp => {
      let query = '';
      
      if (bp.minWidth && bp.maxWidth) {
        query = `(min-width: ${bp.minWidth}px) and (max-width: ${bp.maxWidth}px)`;
      } else if (bp.minWidth) {
        query = `(min-width: ${bp.minWidth}px)`;
      } else if (bp.maxWidth) {
        query = `(max-width: ${bp.maxWidth}px)`;
      }
      
      if (query) {
        breakpointConfig[query] = {
          slides: { perView: bp.perView, spacing: bp.spacing }
        };
      }
    });

    return breakpointConfig;
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['forceUpdate']) {
      if (this.slider) {
        this.slider.destroy();
      }

      if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          const options: KeenSliderOptions = {
            slides: {
              perView: this.defaultPerView(),
              spacing: this.defaultSpacing(),
            },
            breakpoints: this.createBreakpointConfig()
          };
    
          this.slider = new KeenSlider(this.sliderRef()!.nativeElement, options);
        });
      }
    }
  }
}