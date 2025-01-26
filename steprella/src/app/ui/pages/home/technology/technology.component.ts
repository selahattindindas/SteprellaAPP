import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TechnologyFeature {
  id: number;
  title: string;
  image: string;
  altText: string;
}

@Component({
  selector: 'app-technology',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './technology.component.html',
  styleUrl: './technology.component.scss'
})
export class TechnologyComponent {
  features: TechnologyFeature[] = [
    {
      id: 1,
      title: 'Rahatlık Ve Sağlamlık İçin Dolgulu Topuk',
      image: 'assets/images/ui/shoe2.png',
      altText: 'White sneaker'
    },
    {
      id: 2,
      title: 'Hafiflik için tasarlanan dış taban deseni, ayakkabının ağırlığını azaltır.',
      image: 'assets/images/ui/shoe3.png',
      altText: 'Sport sneaker'
    },
    {
      id: 3,
      title: 'Rahatlık Ve Sağlamlık İçin Dolgulu Topuk',
      image: 'assets/images/ui/shoe4.png',
      altText: 'Nike sneaker'
    }
  ];
}
