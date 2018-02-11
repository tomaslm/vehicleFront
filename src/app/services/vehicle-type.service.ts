import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { VehicleType } from '../models/VehicleType';
import { HttpClient } from '@angular/common/http';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class VehicleTypeService extends RestService<VehicleType> {
  constructor(http: HttpClient, progressBarService: ProgressBarService) {
    super(http, 'vehicleType', 'vehicleTypes', progressBarService);
  }

}
