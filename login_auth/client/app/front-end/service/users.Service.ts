import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../environments/environment';
import { Users } from '../model/usersModel';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  selectedUser: Users = {  
    //user_id:'',
    userName: '',
    email: '',
    password: '',
    companyName:'',
    phone:'',
    role:'',
    createdBy:'',
   path:'',
  
    };   //object of model class

  constructor(private http: HttpClient) {
   
   }

    //call Node JS API From the Angular 6 Application
  postUser(user: Users) {
    return this.http.post(environment.apiBaseUrl + '/registerUsers', user);
  }

  getUserRole() {
    return this.http.get(environment.apiBaseUrl + '/role');
  }

  // getComapanyName() {
  //   return this.http.get(environment.apiBaseUrl + '/company_name');
  // }


  // getUserData() {
  //   return this.http.get(environment.apiBaseUrl + '/list_all_user');
  // }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }


  getToken() {
    return localStorage.getItem('token');
  }

  getUserName(){
   var token= this.getToken();
   console.log(token);
   return token;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  //return information stored in jwt payload
  getUserPayload() {
    console.log("in  getUserPayload()");
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
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
