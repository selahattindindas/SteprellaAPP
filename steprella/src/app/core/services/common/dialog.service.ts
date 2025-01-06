import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialog = inject(MatDialog);

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    const dialogRef = this.dialog.open(dialogParameters.componentType!, {
      width: dialogParameters.options?.width || '500px',
      height: dialogParameters.options?.height,
      position: dialogParameters.options?.position,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === dialogParameters.data && dialogParameters.afterClosed) {
        dialogParameters.afterClosed();
      }
    });
  }
}

export class DialogParameters {
  componentType!: ComponentType<any>;
  data?: any;
  afterClosed?: () => void;
  options?: Partial<DialogOptions> = new DialogOptions();
}

export class DialogOptions {
  width?: string = '500px';
  height?: string;
  position?: DialogPosition;
}
