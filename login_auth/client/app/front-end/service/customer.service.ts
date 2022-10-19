
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../environments/environment';

import { customer } from '../model/customerModel'

@Injectable({
  providedIn: 'root'
})

export class customerService {

selectedCustomer: customer =
 {
    company_id:"" ,
    company_name:"",
    address:"",
    createdBy:"",
    // path:[],
    path:''

}

constructor(private http:HttpClient){}

postCustomer(customer:customer)
{
    return this.http.post(environment.apiBaseUrl + '/addCustomer',customer);
}

getCustomer()
{
  return this.http.get(environment.apiBaseUrl + '/getCustomer');
}

postCustomerPath(Token:any) {
  // var obj={
  //   path:Token
  // }
  // console.log("obj",obj);
  
  return this.http.post(environment.apiBaseUrl + '/customerPath', Token);
  
}

setToken(token: string) {
  localStorage.setItem('token', token);
}


getToken() {
  return localStorage.getItem('token');
}


}