import { ChangeDetectionStrategy, Component, inject, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { ListCategory } from '../../../core/models/categories/list-category';
import { ListBrand } from '../../../core/models/brands/list-brand';
import { ListShoeModel } from '../../../core/models/shoe-models/list-shoe-model';
import { combineLatest, filter, map, Observable, switchMap, take } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ListProduct } from '../../../core/models/products/list-product';
import { ShoeModelService } from '../../../core/services/ui/shoe-model.service';
import { BrandService } from '../../../core/services/ui/brand.service';
import { CategoryService } from '../../../core/services/ui/category.service';
import { UsageAreaService } from '../../../core/services/ui/usage-area.service';
import { MaterialService } from '../../../core/services/ui/material.service';
import { FeatureService } from '../../../core/services/ui/feature.service';
import { ListUsageArea } from '../../../core/models/usage-areas/list-usage-area';
import { ListMaterial } from '../../../core/models/materials/list-material';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { ListFeature } from '../../../core/models/features/list-feature';

@Component({
  selector: 'app-product-form',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatRadioModule,
    MatListModule,
    MatSelectionList
  ],
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit, OnChanges {
  private readonly formBuilder = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly brandService = inject(BrandService);
  private readonly shoeModelService = inject(ShoeModelService);
  private readonly usageAreaService = inject(UsageAreaService);
  private readonly materialService = inject(MaterialService);
  private readonly featureService = inject(FeatureService);

  readonly btnTitle = input<string>('');
  readonly listProduct$ = input<Observable<ListProduct>>();
  readonly itemSubmit = output<any>();

  readonly listCategory$ = this.categoryService.getAll();
  readonly listMaterial$ = this.materialService.getAll().pipe(map(response => response.data));
  readonly listUsageArea$ = this.usageAreaService.getAll().pipe(map(response => response.data));
  readonly listFeature$ = this.featureService.getAll().pipe(map(response => response.data));
  readonly listBrand$ = this.brandService.getAll().pipe(map(response => response.data));
  listShoeModel$ = new Observable<ListShoeModel[]>();

  readonly isEditMode = signal(false);

  readonly productForm = this.formBuilder.group({
    categoryId: [0, Validators.required],
    brandId: [0, Validators.required],
    shoeModelId: [0, Validators.required],
    materialId: [0, Validators.required],
    usageAreaId: [0, Validators.required],
    featuresId: [[0], Validators.required],
    price: [0, Validators.required],
    description: ['', Validators.required]
  });

  ngOnInit(): void {
    this.listShoeModel$ = this.getShoeModel();
    this.setupBrandIdChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listProduct$']?.currentValue) {
      this.isEditMode.set(true);
      this.listProduct$()?.pipe(
        filter(Boolean),
        take(1)
      ).subscribe(product => this.populateForm(product));
    }
  }

  getShoeModel() {
    return this.productForm.get('brandId')?.valueChanges.pipe(
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
      this.listMaterial$,
      this.listFeature$,
      this.listUsageArea$,
      this.listCategory$
    ]).pipe(take(1)).subscribe(([brands, materials, features, usageAreas, categories]) => {
      const category = this.findCategory(product, categories);
      const brand = brands.find(b => b.name === product.brandName) || null;
      const feature = product.features || [];
      const material = materials.find(m => m.name === product.materialName) || null;
      const usageArea = usageAreas.find(u => u.name === product.usageAreaName) || null;
  
      if (brand) {
        this.shoeModelService.getByBrandId(brand.id).pipe(take(1)).subscribe(({ data }) => {
          const shoeModel = data.find(sm => sm.name === product.shoeModelName) || null;
          this.updateForm(category, brand, usageArea, material, feature, shoeModel, product);
        });
      } else {
        this.updateForm(category, null, usageArea, material, feature, null, product);
      }
    });
  }

  updateForm(
    category: ListCategory | null, 
    brand: ListBrand | null, 
    usageArea: ListUsageArea | null, 
    material: ListMaterial | null, 
    features: ListFeature[] | [],
    shoeModel: ListShoeModel | null, 
    product: ListProduct
  ): void {
    this.productForm.patchValue({
      categoryId: category?.id || null,
      brandId: brand?.id || null,
      usageAreaId: usageArea?.id || null,
      materialId: material?.id || null,
      shoeModelId: shoeModel?.id || null,
      price: product.price || null,
      description: product.description || '',
      featuresId: features?.map(f => f.id) || [],
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
    
    if (this.isEditMode()) {
      this.listProduct$()?.pipe(take(1)).subscribe(product => {
        if (product) {
          this.itemSubmit.emit({ ...formData, id: product.id });
        }
      });
    } else {
      this.itemSubmit.emit(formData);
    }
  }
}