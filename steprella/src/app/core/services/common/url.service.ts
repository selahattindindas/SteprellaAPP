import { Injectable } from '@angular/core';
import slugify from 'slugify';

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

  // Yeni metodlar
  createFilterQueryParams(filters: any): { [key: string]: string } {
    const queryParams: { [key: string]: string } = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value) && value.length > 0) {
          queryParams[key] = value.join(',');
        } else if (!Array.isArray(value) && value !== '') {
          queryParams[key] = value.toString();
        }
      }
    });

    return queryParams;
  }

  parseQueryParams(params: { [key: string]: string }): any {
    const parsedParams: any = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value.includes(',')) {
        parsedParams[key] = value.split(',').map(Number);
      } else if (['minPrice', 'maxPrice', 'categoryId'].includes(key)) {
        parsedParams[key] = Number(value);
      } else {
        parsedParams[key] = [Number(value)];
      }
    });

    return parsedParams;
  }
}