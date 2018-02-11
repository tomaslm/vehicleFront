import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../models/Vehicle';
import { Observable } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class VehicleService extends RestService<Vehicle> {

  constructor(http: HttpClient, progressBarService: ProgressBarService) {
    super(http, 'vehicle', 'vehicles', progressBarService);
  }

  // findAll(): Observable<Vehicle[]> {
  //   return Observable.of([
  //     { name: 'Name', description: 'description', plate: 'plate', type: undefined }
  //   ]);
  // }

}
