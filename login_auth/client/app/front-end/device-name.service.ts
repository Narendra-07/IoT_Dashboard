import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

const httpOptions = {
  headers : new HttpHeaders({ 'content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DeviceNameService {

  constructor(private http: HttpClient) { }

  getUID (path: string): Observable<any> {
    return this.http.post(environment.apiBaseUrl+ '/getUID', {'path': path}, httpOptions);
  }
  getDeviceNamePath (path: string): Observable<any> {
    return this.http.post(environment.apiBaseUrl+ '/getDeviceNamePath', {'path': path}, httpOptions);
  }
}
