import { ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CreateShoeModelComponent } from "../create-shoe-model/create-shoe-model.component";
import { UpdateShoeModelComponent } from "../update-shoe-model/update-shoe-model.component";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { firstValueFrom } from 'rxjs';
import { ListShoeModel } from '../../../../core/models/shoe-models/list-shoe-model';
import { ShoeModelService } from '../../../../core/services/common/shoe-model.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-list-shoe-model',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatDialogTitle, MatDialogContent, MatDialogActions, CreateShoeModelComponent, UpdateShoeModelComponent],
  standalone: true,
  templateUrl: './list-shoe-model.component.html',
  styleUrl: './list-shoe-model.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListShoeModelComponent implements OnInit{
  private readonly shoeModelService = inject(ShoeModelService);
  readonly data = inject<{ brandId: number }>(MAT_DIALOG_DATA);

  @ViewChild(UpdateShoeModelComponent) updateShoeModelComponent!: UpdateShoeModelComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<ListShoeModel>()
  displayedColumns: string[] = ['id', 'name', 'options'];
  editingShoeModelId: number | null = null;

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    const data = await firstValueFrom(this.shoeModelService.getByBrandId(this.data.brandId));
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  async delete(id:number){
    await firstValueFrom(this.shoeModelService.delete(id, 
      () =>{
        console.log("Başarıyla Eklendi");
        this.dataSource.data = this.dataSource.data.filter(shoeModel => shoeModel.id !== id);

      },
      error =>{
        console.log(error);
      }
    ))
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim();
    this.dataSource.filter = filterValue;
    this.paginator?.firstPage();
  }

  editRow(rowId: number) {
    this.editingShoeModelId = this.editingShoeModelId === rowId ? null : rowId;
  }

  submitUpdate() {
    if (this.updateShoeModelComponent) {
      this.updateShoeModelComponent.onSubmit();
    }
  }
}
