import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { FavoriteService } from '../../../core/services/ui/favorite.service';
import { ListFavorite } from '../../../core/models/favorites/list-favorite';
import { ActivatedRoute, Router } from '@angular/router';
import { PageBannerComponent } from "../../shared/page-banner/page-banner.component";
import { SweetAlertService } from '../../../core/services/common/sweet-alert.service';
import { ResultToolbarComponent } from '../../shared/result-toolbar/result-toolbar.component';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [CardComponent, PageBannerComponent, ResultToolbarComponent],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteComponent implements OnInit{
  private readonly favoriteService = inject(FavoriteService);
  private readonly sweetAlertService = inject(SweetAlertService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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
        console.log(response.data);
      },
      error: () => {
        this.listFavorite.set([]);
        this.totalCount.set(0);
        this.loading.set(false);
      }
    });
  }

  delete(id: number){
    this.sweetAlertService.confirmation().then(result => {
      if (result.isConfirmed) {
        this.favoriteService.delete(id).subscribe({
          next: () => {
            this.sweetAlertService.showMessage();
            this.getFavorites();
          }
        })
      }
    })
  }

  handlePageChange(page: number) {
    this.currentPage.set(page);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge'
    });
  }
}
