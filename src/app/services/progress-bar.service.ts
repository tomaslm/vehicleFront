import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import "rxjs/add/operator/share"
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProgressBarService {
  exibir = new BehaviorSubject<boolean>(true);
  constructor() { }

  encapsula(func: () => Observable<any>): Observable<any> {
    this.exibir.next(true);
    let obs = func().share();
    obs.share().subscribe(res => this.exibir.next(false));
    return obs;
  }
}
