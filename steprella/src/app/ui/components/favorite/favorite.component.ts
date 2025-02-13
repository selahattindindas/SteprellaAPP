import { Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { FavoriteService } from '../../../core/services/ui/favorite.service';
import { ListFavorite } from '../../../core/models/favorites/list-favorite';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-favorite',
  imports: [CardComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent implements OnInit{
  private readonly favoriteService = inject(FavoriteService);
  private route = inject(ActivatedRoute);

  readonly listFavorite = signal<ListFavorite[]>([]);
  readonly loading = signal(false);
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly totalCount = signal(0);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['page']) {
        this.currentPage.set(Number(params['page']));
      }
      this.getFavorites();
    });
  }

  getFavorites(){
    this.loading.set(true);
    this.favoriteService.getFavoritesByUserId(this.currentPage() - 1, this.pageSize()).subscribe({
      next: (response) => {
        this.listFavorite.set(response.data);
        this.totalCount.set(response.totalCount);
        this.loading.set(false);
      },
      error: () => {
        this.listFavorite.set([]);
        this.totalCount.set(0);
        this.loading.set(false);
      }
    });
  }
}
