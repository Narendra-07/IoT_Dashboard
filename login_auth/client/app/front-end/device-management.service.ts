import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

const httpOptions = {
  headers : new HttpHeaders({ 'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DeviceManagementService {

  constructor(private http: HttpClient) { }
  createDeviceManagementData (data: any) { 
    return this.http.post(environment.apiBaseUrl+ '/createDeviceManagementData', data);
  }
  fetchDeviceManagementData (UID: string): Observable<any> {
    return this.http.post(environment.apiBaseUrl+ '/fetchDeviceManagementData', {'UID': UID}, httpOptions);
  }
  updateDeviceManagementData (data: any, _id: string): Observable<any> {
    return this.http.put(environment.apiBaseUrl+ '/updateDeviceManagementData/'+ _id, data, httpOptions);
  }
  deleteDeviceManagementDataById (_id: string): Observable<any> {
    return this.http.delete(environment.apiBaseUrl+ '/deleteDeviceManagementDataById/'+ _id);
  }
  deleteAllDeviceManagementDataByUId (UID: string): Observable<any> {
    return this.http.post(environment.apiBaseUrl+ '/deleteAllDeviceManagementDataByUId', {'UID': UID}, httpOptions);
  }
}
