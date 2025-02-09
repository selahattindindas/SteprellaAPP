import { Injectable } from '@angular/core';
import slugify from 'slugify';
import { ListProduct } from '../../models/products/list-product';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  toSeoFriendlyUrl(text: string): string {
    return slugify(text, {
      replacement: '-',
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
      locale: 'tr',
      trim: true
    });
  }

  createCategoryUrl(...segments: string[]): string {
    return segments
      .map(segment => this.toSeoFriendlyUrl(segment))
      .join('-');
  }

  createProductDetailUrl(product: ListProduct, variantId: number): string {
    const selectedVariant = product.productVariants.find(v => v.id === variantId);
    if (!selectedVariant) {
      const firstActiveVariant = product.productVariants.find(v => v.active);
      if (!firstActiveVariant) return '';
      variantId = firstActiveVariant.id;
    }

    const urlParts = [
      this.toSeoFriendlyUrl(product.brandName),
      this.toSeoFriendlyUrl(product.shoeModelName),
      this.toSeoFriendlyUrl(product.category.name),
      this.toSeoFriendlyUrl(selectedVariant?.colorName || '')
    ];

    const encodedIds = btoa(`${product.id}-${variantId}`);
    return `/p/${urlParts.join('-')}-${encodedIds}`;
  }

  parseIdsFromUrl(slug: string): { productId: number, variantId: number } | null {
    try {
      const parts = slug.split('-');
      const encodedIds = parts[parts.length - 1];
      const [productId, variantId] = atob(encodedIds).split('-').map(Number);
      return { productId, variantId };
    } catch {
      return null;
    }
  }

  parseProductDetailsFromUrl(slug: string): {
    brandName: string,
    modelName: string,
    category: string,
    color: string
  } {
    const parts = slug.split('-');
    parts.pop();
    return {
      brandName: parts[0],
      modelName: parts[1],
      category: parts[2],
      color: parts[3]
    };
  }

  parseProductIdFromUrl(params: any): number | null {
    try {
      const encodedId = params['slug'].split('-').pop();
      return Number(atob(encodedId));
    } catch {
      return null;
    }
  }

  parseVariantIdFromUrl(params: any): number | null {
    try {
      const parts = params['slug'].split('-');
      return Number(parts[parts.length - 2]);
    } catch {
      return null;
    }
  }

  createFilterQueryParams(filters: any): { [key: string]: string } {
    const queryParams: { [key: string]: string } = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value && value.length > 0) {
          queryParams[key] = value.join(',');
        }
      } else if (value !== undefined && value !== null && value !== '') {
        queryParams[key] = value.toString();
      }
    });

    Object.keys(queryParams).forEach(key => {
      if (queryParams[key] === '') {
        delete queryParams[key];
      }
    });

    if (filters.page && filters.page > 1) {
      queryParams['page'] = filters.page.toString();
    }

    if (filters.brandId) queryParams['brandId'] = filters.brandId.join(',');
    if (filters.colorId) queryParams['colorId'] = filters.colorId.join(',');
    if (filters.sizeValue) queryParams['sizeValue'] = filters.sizeValue.join(',');
    if (filters.materialId) queryParams['materialId'] = filters.materialId.join(',');
    if (filters.usageAreaId) queryParams['usageAreaId'] = filters.usageAreaId.join(',');
    if (filters.genderId) queryParams['genderId'] = filters.genderId.join(',');
    
    return queryParams;
  }

  parseQueryParams(params: { [key: string]: string }): any {
    const parsedParams: any = {};
    
    Object.entries(params).forEach(([key, value]) => {
      if (!value) return;

      if (['brandId', 'colorId', 'sizeValue', 'materialId', 'usageAreaId', 'genderId'].includes(key)) {
        parsedParams[key] = value.split(',').map(Number);
      } else if (['minPrice', 'maxPrice', 'categoryId', 'page'].includes(key)) {
        parsedParams[key] = Number(value);
      } else {
        parsedParams[key] = value;
      }
    });

    return parsedParams;
  }
}