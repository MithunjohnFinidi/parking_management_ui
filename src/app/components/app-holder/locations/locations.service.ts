import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private apiService: ApiService) { }

    getData(url):Promise<any> {
        return new Promise(resolve => {
            this.apiService.get(url).then(response => {
                resolve(response);
            }).catch(error=>{
                console.log(error);
            });
        })
    }

    getALocation(url):Promise<any> {
        return new Promise(resolve => {
            this.apiService.get(url).then(response => {
                resolve(response);
            }).catch(error=>{
                console.log(error);
            });
        })
    }

    addLOcation(locationObj):Promise<any> {
        return new Promise(resolve => {
            this.apiService.post('/locations/create-location', locationObj).then(response => {
                resolve(response);
            }).catch(error=>{
                console.log(error);
            });
        })
    }
}
