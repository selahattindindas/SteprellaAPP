import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/common/auth.service';
import { Icon, SweetAlertService } from '../../../../../core/services/common/sweet-alert.service';
import { CommentService } from '../../../../../core/services/ui/comment.service';
import { CreateComment } from '../../../../../core/models/comments/create-comment';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCommentComponent {
  private readonly sweetAlertService = inject(SweetAlertService);
  private readonly commentService = inject(CommentService);
  private readonly authService = inject(AuthService);

  readonly productId = input.required<number>();
  readonly commentAdded = output<void>();

  protected rating = 0;
  protected review = '';
  protected stars = [1, 2, 3, 4, 5];
  protected isFormSubmitted = false;

  rate(star: number): void {
    this.rating = star;
  }

  onSubmit(): void {
    this.isFormSubmitted = true;

    if (!this.authService.isUserAuthenticated()) {
      this.sweetAlertService.showMessage('Yorum yapabilmek için önce giriş yapmalısınız.', Icon.WARNING);
      return;
    }

    if (this.rating === 0 || !this.review.trim()) {
      return;
    }

    const comment: CreateComment = {
      commentText: this.review,
      productId: this.productId(),
      rating: this.rating
    };

    this.commentService.create(comment).subscribe({
      next: () => {
        this.sweetAlertService.showMessage();
        this.commentAdded.emit();
        this.resetForm();
      },
      error: () => {
        this.sweetAlertService.showMessage('Bir hata oluştu', Icon.ERROR);
      }
    });
  }

  private resetForm(): void {
    this.rating = 0;
    this.review = '';
    this.isFormSubmitted = false;
  }
}