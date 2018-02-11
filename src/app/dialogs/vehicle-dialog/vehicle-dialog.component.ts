import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { Vehicle } from '../../models/Vehicle';
import { VehicleType } from '../../models/VehicleType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VehicleService } from '../../services/vehicle.service';
import { VehicleTypeService } from '../../services/vehicle-type.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-vehicle-dialog',
  templateUrl: './vehicle-dialog.component.html',
  styleUrls: ['./vehicle-dialog.component.scss']
})
export class VehicleDialogComponent {

  vehicle: Vehicle;

  isNewRecord = false;

  filteredOptions: VehicleType[];
  myControl: FormControl = new FormControl();

  constructor(public dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private vehicleService: VehicleService,
    private vehicleTypeService: VehicleTypeService, private snackBarService: SnackBarService) {
    this.vehicle = data.vehicle;
    this.isNewRecord = !this.vehicle.id || this.vehicle.id == 0;
  }

  ngOnInit() {
    this.myControl.valueChanges
      .startWith(null)
      .debounceTime(400)
      .do(value => {
        this.vehicleTypeService.findAll(value, 'desc', 'ID', 0, 5).toPromise().then(res => {
          this.filteredOptions = res.content;
        })
      }).subscribe()
  }

  save() {
    if (this.isNewRecord) {
      this.vehicleService.insert(this.vehicle).subscribe(res => {
        this.snackBarService.info('Created successfully');
        this.dialogRef.close({ update: true });
      },
        err => this.snackBarService.warning('Couldn\'t create'));
    } else {
      this.vehicleService.update(this.vehicle).subscribe(res => {
        this.snackBarService.info('Update successfully');
        this.dialogRef.close({ update: true });
      },
        err => this.snackBarService.warning('Couldn\'t update'));
    }
  }

  delete() {
    this.vehicleService.delete(this.vehicle).subscribe(res => {
      this.snackBarService.info('Deleted successfully');
      this.dialogRef.close({ update: true });
    },
      err => this.snackBarService.warning('Couldn\'t delete'));
  }

  displayFn(vehicleType: VehicleType) {
    return vehicleType ? vehicleType.name : '';
  }

  compareFn(v1: VehicleType, v2: VehicleType): boolean {
    return v1.id == v2.id;
  }

}
