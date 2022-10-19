import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { UsersService } from '../service/users.Service';
import { UserService } from '../service/user.service';
import jwt_decode from 'jwt-decode';
import { TreeService } from '../service/treeService';
import { Subscription } from 'rxjs';
import { Router, RouterLinkActive } from "@angular/router";
import {customerService } from '../service/customer.service';

export interface btn {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})



export class HomeComponent implements OnInit {
  subscription: Subscription;
  isDisabled;
  hide;
  customers;
  customers1;
  customers2;
  customers3;
  token;
  userRoles;
  msg:string;
  value: string;
  viewValue: string;

  constructor(private usersService: UsersService,private treeservice: TreeService,private router: Router,public customerService:customerService) { }

ngOnInit(): void {
   this.isDisabled = true;
   this.hide = true;
   this.subscription = this.treeservice.navItem1$.subscribe(
    item =>
    {
          console.log("I am in home subscription");
          if (this.treeservice.varSelected) {
            this.isDisabled = false;
            this.hide = false;
          }
          else {
            this.isDisabled = true;
            this.hide = true;
          }
          // this.isDisabled.false = this.treeservice.varSelected;
          // this.hide.false = this.treeservice.varSelected;
    }
   );
  this.token = this.usersService.getToken();
  var decoded = jwt_decode(this.token);
  var role = decoded['role'];
  
      if (role == "User") {
        this.isDisabled = true;
        this.hide = true;
      }
      if (role == "Engineer") {
        this.isDisabled = true;
        this.hide = false;
      
      }
  

    this.customerService.getCustomer().subscribe(
      res => {
        // console.log(res);
        this.customers=res[0];
      
         this.customers1=res[1];
     
        this.customers2=res[2];
    
        this.customers3=res[3];
      
      },
      err => {
console.log(err);
      }
    )   
}




  opened = true;
  @ViewChild('sidenav') sidenav: MatSidenav;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.opened = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.opened = true;
    }
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width < 768) {
      return true;
    } else {
      return false;
    }
  }


  onLogout(){
    this.usersService.deleteToken();
    this.router.navigate(['/login']);
  }


  clickEvent(){
    this.msg='Button is Clicked';
    console.log(this.msg)
    return this.msg;
  }

  Btn: btn[] = [
    {value: 'add-user', viewValue: 'addUser'},
    {value: 'add-customer', viewValue: 'addCustomer'},
  ];

}

