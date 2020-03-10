import {Injectable, Optional} from '@angular/core';
import {Response} from '@angular/http';
import {Router} from '@angular/router';
import {HttpService} from './http.service';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

// import {Cookie} from 'ng2-cookies/ng2-cookies';
// import {EmitterService} from './emitter.service';
declare var $: any;

@Injectable()
export class ApiService {

    constructor(private httpService : HttpService, private router : Router) {}

    private handleError(error) {
        let err, errormsg;
        try {
            err = (JSON.parse(error._body));
            if (err) {
                errormsg = err.statusText
            } else  {
                return;
            }
        } catch (e) {
            err = error._body;
            if (err) {
                errormsg = err.statusText || 'API UNAVAILABLE AT THE MOMENT'
            } else  {
                return;
            }
        }
        // if (this.router.url !== '/login' && error.status === 401) {
        //     $('body').removeClass('modal-open');
        //     $('.modal-backdrop').remove();
        //     $('.modal').removeClass('in');
        //     Cookie.deleteAll('/');
        //     localStorage.clear();
        //     this
        //         .router
        //         .navigate(['/login']);
        //     $('#MsgBoxBack #bot1-Msg1').click();
        // }
        
        // let errMsgContent;
        // if (error.status === 500) {
        //     errMsgContent = 'INTERNAL SERVER ERROR'
        // }  else if ((error.status === 401) && this.router.url === '/login') {
        //     errMsgContent = 'You have been logged out due to inactivity';
        // } else if (error.status === 401) {
        //     errMsgContent = 'UNAUTHORIZED';
        // }else {
        //     errMsgContent = errormsg;
        // }
        // const errorOptions = {
        //     content: errMsgContent,
        //     color: '#C77878',
        //     iconSmall: 'fas fa-exclamation-triangle bounce animated',
        //     timeout: 3000
        // };
        // $('.SmallBox').remove();
        // this
        //     .notificationService
        //     .smallBox(errorOptions);
        return err;
    }

    get(url: string) {
        const that = this;
        const getPromise = new Promise((resolve, reject) => {
            this
                .httpService
                .get(url)
                // ...and calling .json() on the response to return data
                .map((res: Response) => res.json())
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    console.log(error);
                    reject(that.handleError(error));
                });
        });
        return getPromise;
    }

    post(url: string, options?: any) {
        const that = this;
        const getPromise = new Promise((resolve, reject) => {
            this
                .httpService
                .post(url, options)
                // ...and calling .json() on the response to return data
                .map((res: Response) => res.json())
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(that.handleError(error));
                });
        });
        return getPromise;
    }

    delete(url: string) {
        const that = this;
        const getPromise = new Promise((resolve, reject) => {
            this
                .httpService
                .delete(url)
                // ...and calling .json() on the response to return data
                // .map((res: Response) => res.json())
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(that.handleError(error));
                });
        });
        return getPromise;
    }

    patch(url: string, options: any) {
        const that = this;
        const getPromise = new Promise((resolve, reject) => {
            this
                .httpService
                .patch(url, options)
                // ...and calling .json() on the response to return data
                .map((res: Response) => res.json())
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(that.handleError(error));
                });
        });
        return getPromise;
    }

    put(url: string, options: any) {
        const that = this;
        const getPromise = new Promise((resolve, reject) => {
            this
                .httpService
                .put(url, options)
                // ...and calling .json() on the response to return data
                .map((res: Response) => res.json())
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(that.handleError(error));
                });
        });
        return getPromise;
    }

}
