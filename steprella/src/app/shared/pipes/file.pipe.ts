import { Pipe, PipeTransform } from '@angular/core';
import { ListFile } from '../../core/models/files/list-file';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'fileArray',
  standalone: true
})
export class FilePipe implements PipeTransform {

  transform(image: ListFile): string {
    if (image && image.path) {
      return environment.photoUrl + '/' + image.path;
    } else {
      return '';
    }
  }
}
