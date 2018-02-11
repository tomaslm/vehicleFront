import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Vehicle } from '../../models/Vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatPaginator, MatInput, MatSort, PageEvent, Sort } from '@angular/material';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { VehicleDialogComponent } from '../../dialogs/vehicle-dialog/vehicle-dialog.component';
import { SnackBarService } from '../../services/snack-bar.service';
import { BehaviorSubject } from 'rxjs';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, tap, catchError, finalize } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { RestService } from '../../services/rest.service';
import { PagedResponse } from '../../models/PagedResponse';
import { RegistersDataSource } from '../../models/RegistersDataSource';

@Component({
  selector: 'app-vehicle-data-table',
  templateUrl: './vehicle-data-table.component.html',
  styleUrls: ['./vehicle-data-table.component.scss']
})
export class VehicleDataTableComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild('input') input: ElementRef;

  dataSource: RegistersDataSource<Vehicle>;
  displayedColumns = ['name', 'description', 'plate', 'type', 'edit', 'delete'];
  constructor(private vehicleService: VehicleService, public dialog: MatDialog,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.dataSource = new RegistersDataSource(this.vehicleService);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadVehiclePage();
        })
      ).subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadVehiclePage())
      ).subscribe();

    this.dataSource.loadRegisters('', 'desc', 'ID', 0, this.paginator.pageSize);

  }

  loadVehiclePage() {
    this.dataSource.loadRegisters(
      this.input.nativeElement.value,
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  create() {
    let dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: { vehicle: new Vehicle() }
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.update) {
        this.loadVehiclePage();
      }
    });
  }
  edit(vehicle: Vehicle) {
    let dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: { vehicle: Object.assign({}, vehicle) }
    })
    dialogRef.afterClosed().subscribe(res => {
      if (res && res.update) {
        this.loadVehiclePage();
      }
    });
  }

  delete(vehicle: Vehicle) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        onYesClick: () => {
          this.vehicleService.delete(vehicle).subscribe(res => {
            this.vehicleService.delete(vehicle);
            this.snackBarService.info('Delete successfully');
            this.dialog.closeAll();
          }, err => this.snackBarService.info('Couldn\'t delete '))
          //update datatable values
        },
        onNoClick: () => this.snackBarService.info('Nothing changed.')
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.update) {
        this.loadVehiclePage();
      }
    });
  }
}
