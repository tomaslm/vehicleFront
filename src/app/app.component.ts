import { Component, ViewChild } from '@angular/core';
import { VehicleTypeService } from './services/vehicle-type.service';
import { VehicleService } from './services/vehicle.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Vehicle } from './models/Vehicle';
import { ProgressBarService } from './services/progress-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  exibirProgressBar;
  constructor(private vehicleTypeService: VehicleTypeService,
    private vehicleService: VehicleService,
    progresBarService: ProgressBarService) {
    progresBarService.exibir.subscribe(exibir => this.exibirProgressBar = exibir);
  }
  title = 'Vehicles Application';

}

