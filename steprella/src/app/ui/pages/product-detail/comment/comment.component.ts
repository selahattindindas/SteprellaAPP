import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCommentComponent } from './list-comment/list-comment.component';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { ListComment } from '../../../../core/models/comments/list-comment';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, ListCommentComponent, CreateCommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
  readonly productId = input.required<number>();
  readonly listComment = input<ListComment[]>();
  readonly commentAdded = output<void>();

  onCommentAdded() {
    this.commentAdded.emit();
  }
}