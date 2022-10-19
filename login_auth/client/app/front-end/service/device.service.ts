import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../environments/environment';
import { device } from '../model/deviceModel';

@Injectable({
  providedIn: 'root'
})

export class deviceService {

selectedDevice: device =
 {
    UID:"" ,
    deviceName:"",
    createdBy:""
}

constructor(private http:HttpClient){}

postDevice(device:device)
{
    return this.http.post(environment.apiBaseUrl + '/addDeviceName',device);
}

getDevice()
{
  return this.http.get(environment.apiBaseUrl + '/getDevice');
}

postDevicePath(Token:any) {
  // var obj={
  //   path:Token
  // }
  // console.log("obj",obj);
  
  return this.http.post(environment.apiBaseUrl + '/devicePath', Token);
  
}

setToken(token: string) {
  localStorage.setItem('token', token);
}


getToken() {
  return localStorage.getItem('token');
}


}