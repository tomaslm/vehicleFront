import { Component, OnInit, Inject } from '@angular/core';
import { SnackBarService } from '../../services/snack-bar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { VehicleTypeService } from '../../services/vehicle-type.service';
import { VehicleType } from '../../models/VehicleType';

@Component({
  selector: 'app-vehicle-type-dialog',
  templateUrl: './vehicle-type-dialog.component.html',
  styleUrls: ['./vehicle-type-dialog.component.scss']
})
export class VehicleTypeDialogComponent {

  vehicleType: VehicleType;


  isNewRecord = false;

  constructor(public dialogRef: MatDialogRef<VehicleTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleTypeService: VehicleTypeService, private snackBarService: SnackBarService) {
    this.vehicleType = data.vehicleType;
    this.isNewRecord = !this.vehicleType.id || this.vehicleType.id == 0;
  }

  save() {
    if (this.isNewRecord) {
      this.vehicleTypeService.insert(this.vehicleType).subscribe(res => {
        this.snackBarService.info('Created successfully');
        this.dialogRef.close({ update: true });
      },
        err => this.snackBarService.warning('Couldn\'t create'));
    } else {
      this.vehicleTypeService.update(this.vehicleType).subscribe(res => {
        this.snackBarService.info('Update successfully');
        this.dialogRef.close({ update: true });
      },
        err => this.snackBarService.warning('Couldn\'t update'));
    }
  }

  delete() {
    this.vehicleTypeService.delete(this.vehicleType).subscribe(res => {
      this.snackBarService.info('Deleted successfully');
      this.dialogRef.close({ update: true });
    },
      err => this.snackBarService.warning('Couldn\'t delete'));
  }

}
