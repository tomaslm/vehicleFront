import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Vehicle } from '../models/Vehicle';
import { PagedResponse } from '../models/PagedResponse';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class RestService<T> {

    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "GET, PUT, POST");


    url = environment.urlAPI;

    constructor(private http: HttpClient, private singularResource: string, private pluralResource: string,
        private progresBarService: ProgressBarService) { }

    findAll(filter?: string, sortDirection?: string, sortId?: string, pageIndex?: number, pageSize?: number): Observable<PagedResponse<T>> {
        let httpParams = new HttpParams();

        httpParams = httpParams.append('filter', '%' + (filter || '') + '%');
        httpParams = httpParams.append('sortDirection', sortDirection || 'desc');
        httpParams = httpParams.append('sortId', sortId || 'ID');
        httpParams = httpParams.append('pageIndex', (pageIndex || 0).toString());
        httpParams = httpParams.append('pageSize', (pageSize || 100).toString());
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
