// import { Cookie } from 'ng2-cookies/ng2-cookies';
import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { environment } from '../../environments/environment';

@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        if(url['url'].startsWith('http')) {
            return super.request(url);
        }
        else if(url['url'].endsWith('.json')) {
            return super.request(url, options);
        } else {
            url['url'] = environment.apiUrl + url['url'];
            return super.request(url);
            // return super.request(url, options);
            // url['url'] = process.env.NODE_ENV === 'production' ? process.env.PROD_APIURL + url['url'] : process.env.DEV_APIURL + url['url']
            // return super.request(url, options);
        }
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        if(url.startsWith('http')) {
            return super.get(url);
        }
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options));
    }
    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.patch(url, body, this.getRequestOptionArgs(options));
    }
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Access-Control-Allow-Origin', '*');
        options.headers.append("Access-Control-Allow-Headers", "Origin");
        options.headers.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        options.headers.append('Content-Type', 'application/json');
        // options.headers.append('Authorization', ('JWT '+Cookie.get('token')));
        return options;
    }
}