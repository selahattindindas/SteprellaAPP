import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileComponent } from '../../file/file.component';
import { ListSizeComponent } from "../../size/list-size/list-size.component";

@Component({
  selector: 'app-update-product-variant',
  imports: [FileComponent, ListSizeComponent],
  standalone: true,
  templateUrl: './update-product-variant.component.html',
  styleUrl: './update-product-variant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UpdateProductVariantComponent {
  private readonly route = inject(ActivatedRoute);
  id : number = this.route.snapshot.params['id'];

}
