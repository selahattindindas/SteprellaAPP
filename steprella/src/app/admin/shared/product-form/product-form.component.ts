import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ListCategory } from '../../../core/models/categories/list-category';
import { ListBrand } from '../../../core/models/brands/list-brand';
import { ListShoeModel } from '../../../core/models/shoe-models/list-shoe-model';
import { combineLatest, Observable, of, switchMap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../core/services/common/category.service';
import { BrandService } from '../../../core/services/common/brand.service';
import { ShoeModelService } from '../../../core/services/common/shoe-model.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ListProduct } from '../../../core/models/products/list-product';

@Component({
  selector: 'app-product-form',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() btnTitle = '';
  @Input() listProduct$: Observable<ListProduct> | undefined;
  @Output() itemSubmit = new EventEmitter();

  private readonly formBuilder = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);
  private readonly shoeModelService = inject(ShoeModelService);

  listCategory$: Observable<ListCategory[]> = of([]);
  listBrand$: Observable<ListBrand[]> = of([]);
  listShoeModel$: Observable<ListShoeModel[]> = of([]);

  isEditMode: boolean = false;

  productForm = this.formBuilder.group({
    categoryId: [0, Validators.required],
    brandId: [0, [Validators.required]],
    shoeModelId: [0, [Validators.required]],
    price: [0, [Validators.required]],
    description: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.getAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listProduct$'] && this.listProduct$) {
      this.isEditMode = true;
      this.listProduct$.subscribe(product => {
        if (product) {
          setTimeout(() => {
            this.getValue(product);
          }, 200)
        }
      });
    }
  }

  getValue(product: ListProduct) {
    combineLatest([
      this.listBrand$ ?? of([]),
      this.listCategory$ ?? of([]),
      this.listShoeModel$ ?? of([])
    ])
      .pipe(
        switchMap(([brandList, categoryList, shoeModelList]) => {
          const category = this.findCategory(product, categoryList);
          const brand = brandList.find(b => b.name === product.brandName);
          const shoeModel = brand ? shoeModelList.find(sm => sm.name === product.shoeModelName) : null;

          return of({ category, brand, shoeModel });
        })
      )
      .subscribe(({ category, brand, shoeModel }) => {
        this.productForm.patchValue({
          categoryId: category?.id || null,
          brandId: brand?.id || null,
          shoeModelId: shoeModel?.id || null,
          price: product.price || null,
          description: product.description || ''
        });
      });
  }

  private findCategory(product: ListProduct, categoryList: ListCategory[]) {
    return categoryList.reduce((found, c) => {
      if (c.id === product.category.parentId) {
        const child = c.children.find(child => child.name === product.category.name);
        return child || found;
      }
      return found;
    }, null as ListCategory | null);
  }

  getAll() {
    this.listBrand$ = this.brandService.getAll();
    this.listCategory$ = this.categoryService.getAll();

    this.productForm.get('brandId')?.valueChanges
      .pipe(
        switchMap(brandId => brandId ? this.shoeModelService.getByBrandId(brandId) : of([]))
      )
      .subscribe(models => this.listShoeModel$ = of(models));
  }

  onSubmit() {
    if (!this.productForm.valid) return;

    const formData = this.productForm.value;

    if (this.isEditMode) {
      this.listProduct$?.subscribe(product => {
        if (product) {
          const formattedData = { ...formData, id: product.id };
          this.itemSubmit.emit(formattedData);
        }
      });
    } else {
      this.itemSubmit.emit(formData);
    }
  }

}
