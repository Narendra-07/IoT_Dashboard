import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtPayload } from "jwt-decode";
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt'
import { UserService } from '../service/user.service';
import { User } from '../model/user.model'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService],
})

export class SignInComponent {
  loggedIn = false;
  currentUser: User = new User();
  jwtHelper = new JwtHelperService();
  public path = String;
  public userPath: User;
  constructor(private userService: UserService, private router: Router) {

  }

  model = {
    email: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  serverErrorMessages: String;

  //call login function from userservice class
  onSubmit(form: NgForm) {
    console.log("In sign in component");
    this.userService.login(form.value).subscribe(
      res => {

        this.userService.setToken(res['token']);
        const token = this.userService.getToken();
        console.log("token is", token);
        var decoded = jwt_decode(token);
        var drole = decoded['role']
        var dPath = decoded['path']
        this.path = dPath;
        //console.log("current user role", drole);
        //console.log("current user path", dPath);
        console.log("userService.login decoded token", decoded)
        //console.log("decoded role is", decoded['role']);
        //console.log("decoded token is", decoded['_userName']);
        console.log("decoded token path is", decoded['path']);
        this.router.navigateByUrl('/home');
      },
      err => {
        this.serverErrorMessages = err.error.message;
      }
    );


  }

  decodeUserFromToken(token: string): object {
    return this.jwtHelper.decodeToken(token);
  }


}