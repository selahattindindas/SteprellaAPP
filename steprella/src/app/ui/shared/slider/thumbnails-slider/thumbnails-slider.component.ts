import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, PLATFORM_ID, viewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance, KeenSliderPlugin } from 'keen-slider';

function ThumbnailPlugin(main: KeenSliderInstance): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          main.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      addActive(slider.track.details.rel)
      addClickEvents()
      main.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

@Component({
  selector: 'app-thumbnails-slider',
  imports: [CommonModule],
  templateUrl: './thumbnails-slider.component.html',
  styleUrl: './thumbnails-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailsSliderComponent {
  private readonly platformId = inject(PLATFORM_ID);

  readonly sliderRef = viewChild<ElementRef<HTMLElement>>("sliderRef");
  readonly thumbnailRef = viewChild<ElementRef<HTMLElement>>("thumbnailRef");

  slider: KeenSliderInstance | undefined;
  thumbnailSlider: KeenSliderInstance | undefined;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.slider = new KeenSlider(this.sliderRef()!.nativeElement, {
          initial: 0,
          drag: true,
          rubberband: true,
        });
      
        this.thumbnailSlider = new KeenSlider(
          this.thumbnailRef()!.nativeElement,
          {
            initial: 0,
            slides: { 
              perView: 4, 
              spacing: 10 
            },
          },
          [ThumbnailPlugin(this.slider)]
        );
      }, 0);
    }
  }

  ngOnDestroy() {
    if (this.slider) {
      this.slider.destroy();
    }
    if (this.thumbnailSlider) {
      this.thumbnailSlider.destroy();
    }
  }
}
