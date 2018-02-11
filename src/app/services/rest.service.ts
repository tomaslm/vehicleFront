import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Vehicle } from '../models/Vehicle';
import { PagedResponse } from '../models/PagedResponse';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class RestService<T> {

    url = environment.urlAPI;

    constructor(private http: HttpClient, private singularResource: string, private pluralResource: string,
        private progresBarService: ProgressBarService) { }

    findAll(filter?: string, sortDirection?: string, sortId?: string, pageIndex?: number, pageSize?: number): Observable<PagedResponse<T>> {
        let httpParams = new HttpParams();
        httpParams = httpParams.set('filter', '%' + (filter || '') + '%');
        httpParams = httpParams.set('sortDirection', sortDirection || 'desc');
        httpParams = httpParams.set('sortId', sortId || 'ID');
        httpParams = httpParams.set('pageIndex', (pageIndex || 0).toString());
        httpParams = httpParams.set('pageSize', (pageSize || 100).toString());
        return this.progresBarService.encapsula(() =>
            this.http.get<PagedResponse<T>>(this.url + this.pluralResource, { params: httpParams }));
    }

    insert(resource: T) {
        return this.progresBarService.encapsula(() => this.http.post(this.url + this.pluralResource, resource));
    }

    findById(id: number) {
        return this.progresBarService.encapsula(() => this.http.get(this.url + this.singularResource +
            '/' + id.toString()));
    }


    update(resource: T) {
        return this.progresBarService.encapsula(() => this.http.put(this.url + this.singularResource +
            '/' + resource['id'].toString(), resource));

    }

    delete(resource: T) {
        return this.progresBarService.encapsula(() => this.http.delete(this.url + this.singularResource +
            '/' + resource['id'].toString()));
    }

}
