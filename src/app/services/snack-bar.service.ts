import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

  constructor(public snackBar: MatSnackBar) { }

  info(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000
    });
  }
  warning(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000
    });
  }

}
