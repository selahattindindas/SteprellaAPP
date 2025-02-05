import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comment {
  id: number;
  userName: string;
  rating: number;
  text: string;
  date: Date;
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  protected rating = 0;
  protected review = '';
  protected stars = [1, 2, 3, 4, 5];  // Yıldızlar için dizi

  protected comments: Comment[] = [
    {
      id: 1,
      userName: 'Ahmet Yılmaz',
      rating: 5,
      text: 'Harika bir ürün, çok memnun kaldım. Ayakkabı tam beklediğim gibi ve çok rahat.',
      date: new Date('2024-03-15')
    },
    {
      id: 2,
      userName: 'Mehmet Kurden',
      rating: 4,
      text: 'Kaliteli bir ürün, sadece kargo biraz geç geldi. Onun dışında her şey çok iyi.',
      date: new Date('2024-03-10')
    },
    {
      id: 3,
      userName: 'Ayşe Sabancı',
      rating: 5,
      text: 'Tam istediğim model. Günlük kullanım için ideal ve çok şık duruyor.',
      date: new Date('2024-03-05')
    }
  ];

  rate(star: number): void {
    this.rating = star;
  }
}
