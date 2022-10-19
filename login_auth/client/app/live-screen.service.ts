import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './front-end/environments/environment';
// import { DeviceDataTable } from './device-data-table';
// import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({ 'content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class LiveScreenService {
  constructor(private http: HttpClient) { }
  
  deviceLiveData (path:string):Observable<any>
  {
    console.log("deviceLiveData api is called");
    return this.http.post(environment.apiBaseUrl+ '/deviceLiveData',{'path': path},httpOptions);

  }
}
