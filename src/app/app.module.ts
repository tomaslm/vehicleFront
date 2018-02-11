import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VehicleService } from './services/vehicle.service';
import { VehicleTypeService } from './services/vehicle-type.service';
import {
  MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatTableModule, MatFormFieldModule,
  MatIconModule, MatDialogModule, MatInputModule, MatSelectModule, MatProgressBarModule, MAT_DIALOG_DEFAULT_OPTIONS, MatPaginatorModule, MatSortModule, MatAutocompleteModule
} from '@angular/material';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { VehicleDataTableComponent } from './components/vehicle-data-table/vehicle-data-table.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { VehicleDialogComponent } from './dialogs/vehicle-dialog/vehicle-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SnackBarService } from './services/snack-bar.service';
import { VehicleTypeDataTableComponent } from './components/vehicle-type-data-table/vehicle-type-data-table.component';
import { VehicleTypeDialogComponent } from './dialogs/vehicle-type-dialog/vehicle-type-dialog.component';
import { ProgressBarService } from './services/progress-bar.service';

@NgModule({
  declarations: [
    AppComponent,
    VehicleDataTableComponent,
    ConfirmDialogComponent,
    VehicleDialogComponent,
    VehicleTypeDataTableComponent,
    VehicleTypeDialogComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatCheckboxModule, MatSnackBarModule,
    MatTableModule, MatFormFieldModule, MatSortModule, MatAutocompleteModule,
    MatIconModule, MatDialogModule, MatProgressBarModule, MatInputModule, MatSelectModule, FormsModule, MatPaginatorModule,
    HttpClientModule, ReactiveFormsModule
  ],
  entryComponents: [ConfirmDialogComponent, VehicleDialogComponent, VehicleTypeDialogComponent],
  providers: [VehicleService,
    VehicleTypeService, ConfirmDialogComponent, VehicleDialogComponent,
    SnackBarService, ProgressBarService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true, disableClose: false, minWidth: '400px' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
