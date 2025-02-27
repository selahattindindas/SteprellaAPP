import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ListComment } from '../../../../../core/models/comments/list-comment';

@Component({
  selector: 'app-list-comment',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './list-comment.component.html',
  styleUrl: './list-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCommentComponent {
  readonly comment = input<ListComment | null>(null);
}
