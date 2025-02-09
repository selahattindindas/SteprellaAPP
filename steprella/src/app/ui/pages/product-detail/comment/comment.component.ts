import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListProduct } from '../../../../core/models/products/list-product';
import { ListComment } from '../../../../core/models/comments/list-comment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  readonly listComment = input<ListComment[] | undefined>([]);

  protected rating = 0;
  protected review = '';
  protected stars = [1, 2, 3, 4, 5];


  rate(star: number): void {
    this.rating = star;
  }


}
