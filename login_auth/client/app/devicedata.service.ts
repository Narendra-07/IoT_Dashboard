import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './front-end/environments/environment';
// const API_URL = 'http://localhost:3000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DevicedataService {
  constructor(private http: HttpClient) { }
  getDeviceData (path:string ):Observable<any> 
  
  {
    return this.http.post(environment.apiBaseUrl+ '/getDeviceNamePath',{'path': path},httpOptions);
    
  }
 }

