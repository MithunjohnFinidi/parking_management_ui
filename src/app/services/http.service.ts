import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Request } from '@angular/http';
import { Observable } from 'rxjs';

// Import RxJs required methods
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
    constructor(private http: Http) { }
    get(url: string): Observable<Response> {
        return this.http.get(url);
    }

    post(url: string, options: string): Observable<Response> {
        return this.http.post(url, options);
    }

    delete(url: string): Observable<Response> {
        return this.http.delete(url);
    }

    put(url: string, options: string): Observable<Response> {
        return this.http.put(url, options);
    }
    patch(url: string, options: string): Observable<Response> {
        return this.http.patch(url, options);
    }
}