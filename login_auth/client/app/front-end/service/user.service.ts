import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../environments/environment';

import { User } from '../model/user.model';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User = {
  
    fullName: '',
    email: '',
    password: '',
    path:'',
  };   //object of model class

  constructor(private http: HttpClient) { }

  //call Node JS API From the Angular 6 Application
  postMasterUser(user: User) {
    return this.http.post(environment.apiBaseUrl + '/register', user);
  }

  login(authCredentials: User) {

    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials)
  }   

 

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  //return information stored in jwt payload
  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);        //decode encoded data
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    // console.log("token value is", userPayload);
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}

