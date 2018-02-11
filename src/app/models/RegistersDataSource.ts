
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatPaginator, MatInput, MatSort, PageEvent, Sort } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, tap, catchError, finalize } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { of } from 'rxjs/observable/of';
import { RestService } from '../services/rest.service';
import { PagedResponse } from './PagedResponse';

export class RegistersDataSource<T> extends DataSource<T>  {

  registersSubject = new BehaviorSubject<T[]>([]);
  count = new BehaviorSubject<Number>(0);

  constructor(private registersService: RestService<T>) {
    super();
  }

  loadRegisters(filter: string,
    sortDirection: string,
    sortId: string,
    pageIndex: number,
    pageSize: number) {
    this.registersService.findAll(filter, sortDirection, sortId, pageIndex, pageSize).pipe(
      catchError(() => of(new PagedResponse<T>()))
    ).subscribe(res => {
      this.count.next(res.totalElements);
      this.registersSubject.next(res.content);
    }
    );
  }

  connect(): Observable<T[]> {
    return this.registersSubject.asObservable();
  }

  disconnect() {
    this.registersSubject.complete();
  }

}