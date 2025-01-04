import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ListCategory } from '../../../core/models/categories/list-category';
import { ListBrand } from '../../../core/models/brands/list-brand';
import { ListShoeModel } from '../../../core/models/shoe-models/list-shoe-model';
import { combineLatest, filter, map, Observable, switchMap, take } from 'rxjs';
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
  @Input() listProduct$: Observable<ListProduct | null> | undefined;
  @Output() itemSubmit = new EventEmitter();

  private readonly formBuilder = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);
  private readonly shoeModelService = inject(ShoeModelService);

  listCategory$ = this.categoryService.getAll();
  listBrand$ = this.brandService.getAll().pipe(map(response => response.data));
  listShoeModel$!: Observable<ListShoeModel[]>;

  isEditMode = false;

  productForm = this.formBuilder.group({
    categoryId: [0, Validators.required],
    brandId: [0, Validators.required],
    shoeModelId: [0, Validators.required], 
    price: [0, Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit(): void {
    this.getShoeModel();
    this.setupBrandIdChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listProduct$']?.currentValue) {
      this.isEditMode = true;
      this.listProduct$?.pipe(
        filter(Boolean),
        take(1)
      ).subscribe(product => this.populateForm(product));
    }
  }

  getShoeModel(): void {
    this.listShoeModel$ = this.productForm.get('brandId')?.valueChanges.pipe(
      filter(Boolean),
      switchMap(brandId => this.shoeModelService.getByBrandId(brandId)),
      map(response => response.data)
    ) || new Observable<ListShoeModel[]>();
  }

  setupBrandIdChanges(): void {
    this.productForm.get('brandId')?.valueChanges.pipe(
      filter(Boolean),
      switchMap(brandId => this.shoeModelService.getByBrandId(brandId)),
      map(response => response.data)
    ).subscribe();
  }

  populateForm(product: ListProduct): void {
    combineLatest([
      this.listBrand$,
      this.listCategory$
    ]).pipe(take(1)).subscribe(([brands, categories]) => {
      const category = this.findCategory(product, categories);
      const brand = brands.find(b => b.name === product.brandName);
      
      if (brand) {
        this.shoeModelService.getByBrandId(brand.id).pipe(take(1)).subscribe(({data}) => {
          const shoeModel = data.find(sm => sm.name === product.shoeModelName) || null;
          this.updateForm(category, brand, shoeModel, product);
        });
      } else {
        this.updateForm(category, null, null, product);
      }
    });
  }

  updateForm(category: ListCategory | null, brand: ListBrand | null, shoeModel: ListShoeModel | null, product: ListProduct): void {
    this.productForm.patchValue({
      categoryId: category?.id || null,
      brandId: brand?.id || null,
      shoeModelId: shoeModel?.id || null,
      price: product.price || null,
      description: product.description || ''
    });
  }

  findCategory(product: ListProduct, categories: ListCategory[]): ListCategory | null {
    for (const category of categories) {
      if (category.id === product.category.parentId) {
        const child = category.children.find(c => c.name === product.category.name);
        if (child) return child;
      }
    }
    return null;
  }

  onSubmit(): void {
    if (!this.productForm.valid) return;

    const formData = this.productForm.value;
    
    if (this.isEditMode) {
      this.listProduct$?.pipe(take(1)).subscribe(product => {
        if (product) {
          this.itemSubmit.emit({ ...formData, id: product.id });
        }
      });
    } else {
      this.itemSubmit.emit(formData);
    }
  }
}
