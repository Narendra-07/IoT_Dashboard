import { Component, OnInit } from '@angular/core';
import { UsersService } from '../service/users.Service';
import { customerService } from '../service/customer.service';
import { NgForm } from '@angular/forms';
import { Users } from '../model/usersModel';
import { UserService } from '../service/user.service';
import jwt_decode from 'jwt-decode';
import { TreeService } from '../service/treeService';
import { remove } from 'jszip';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UsersService],
})
export class SignUpComponent implements OnInit {
  displayFlg = 0;
  isLoading = true;
  userRoles;
  isValidated = false;
  token;
  tokenValue;
  company_names;
  path;
 roleName=[];

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  mobileNoPattern = /^((\\+91-?)|0)?[0-9]{10}$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;


  constructor(public usersService: UsersService, public customerService: customerService, public treeService: TreeService) {

  }


  ngOnInit(): void {
    
    this.token = this.usersService.getToken();
    var decoded = jwt_decode(this.token);
    console.log("decoded token is", decoded['_userName']);
    console.log("decoded role is", decoded['role']);
    var role = decoded['role'];
    this.tokenValue = decoded['_userName'];
    this.path = this.treeService.path;
    console.log("this.path=this.treeService.path;", this.path)

    this.usersService.getUserRole().subscribe(
      res => {
        console.log("res", res)
        this.userRoles = res;
        if (role == "Admin")
        {
          this.userRoles.splice(0,1);
        } 
        console.log("this.userRoles", this.userRoles)
      },
      err => {
        console.log(err);

      }
    );

    this.customerService.getCustomer().subscribe(
      res => {
        console.log(res);
        this.company_names = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log("in user ", form.value)
    console.log("in User Info component");
    this.usersService.postUser(form.value).subscribe(
      res => {
        console.log("save successfully");
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        console.log("error 422");
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          console.log("error ");
        this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.usersService.selectedUser = {
      //  user_id: '',
      userName: '',
      email: '',
      password: '',
      companyName: '',
      phone: '',
      role: '',
      createdBy: '',
      path: '',

    };
    form.resetForm();
    this.serverErrorMessages = '';
  }


  focSearchText() {
    this.displayFlg = 1;
  }


  changeRole(e) {  
    console.log(e.target.value);  
    var selectedRole=e.target.value;
    this.roleName.push(selectedRole);
    console.log("Rolename",this.roleName)
  }  

}