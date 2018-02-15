import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Vehicle } from '../../models/Vehicle';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatPaginator, MatInput, MatSort, PageEvent, Sort } from '@angular/material';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { SnackBarService } from '../../services/snack-bar.service';
import { BehaviorSubject } from 'rxjs';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, tap, catchError, finalize } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { RestService } from '../../services/rest.service';
import { PagedResponse } from '../../models/PagedResponse';
import { RegistersDataSource } from '../../models/RegistersDataSource';
import { VehicleTypeService } from '../../services/vehicle-type.service';
import { VehicleType } from '../../models/VehicleType';
import { VehicleTypeDialogComponent } from '../../dialogs/vehicle-type-dialog/vehicle-type-dialog.component';
@Component({
  selector: 'app-vehicle-type-data-table',
  templateUrl: './vehicle-type-data-table.component.html',
  styleUrls: ['./vehicle-type-data-table.component.scss']
})
export class VehicleTypeDataTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  dataSource: RegistersDataSource<VehicleType>;
  displayedColumns = ['name', 'description', 'edit', 'delete'];
  constructor(private vehicleTypeService: VehicleTypeService, public dialog: MatDialog,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.dataSource = new RegistersDataSource(this.vehicleTypeService);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(() => {
        this.paginator.pageIndex = 0;

        this.loadVehicleTypePage();
      })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      tap(() => this.loadVehicleTypePage())
      ).subscribe();

    this.dataSource.loadRegisters('', 'desc', 'ID', 0, this.paginator.pageSize);

  }

  loadVehicleTypePage() {
    this.dataSource.loadRegisters(
      this.input.nativeElement.value,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  create() {
    let dialogRef = this.dialog.open(VehicleTypeDialogComponent, {
      data: { vehicleType: new VehicleType() }
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.update) {
        this.loadVehicleTypePage();
      }
    });
  }
  edit(vehicleType: VehicleType) {
    let dialogRef = this.dialog.open(VehicleTypeDialogComponent, {
      data: { vehicleType: Object.assign({}, vehicleType) }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.update) {
        this.loadVehicleTypePage();
      }
    });
  }

  delete(vehicleType: VehicleType) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        onYesClick: () => {
          this.vehicleTypeService.delete(vehicleType).subscribe(res => {
            this.snackBarService.info('Delete successfully');
            dialogRef.close();
          }
            , err => this.snackBarService.info('Couldn\'t delete '))
          //update datatable values
        },
        onNoClick: () => this.snackBarService.info('Nothing changed.')
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.update) {
        this.loadVehicleTypePage();
      }
    });
  }



}


