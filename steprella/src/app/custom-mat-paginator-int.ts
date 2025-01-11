import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
    constructor() {
        super();

        this.getAndInitTranslations();
    }

    getAndInitTranslations() {

        this.itemsPerPageLabel = "Sıralama:";
        this.nextPageLabel = "Sonraki sayfa";
        this.previousPageLabel = "Önceki sayfa";
        this.changes.next();
    }

    showFirstLastButtons = true;
}
