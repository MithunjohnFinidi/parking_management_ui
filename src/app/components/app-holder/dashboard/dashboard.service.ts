import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

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
}
