import { Component, OnInit, Input } from '@angular/core';
import { customerService } from '../service/customer.service';
import { NgForm } from '@angular/forms';
import { TreeService } from '../service/treeService';
import jwt_decode from 'jwt-decode';
import { EmptyExpr } from '@angular/compiler';
import { EMPTY } from 'rxjs';
import { nextTick } from 'process';
// import { AngularTreeComponent } from './angular-tree/angular-tree.component';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {


  showSucessMessage: boolean;
  serverErrorMessages: string;
  token;
  tokenValue;
  path;

  constructor(public customerService: customerService, public treeService: TreeService) {

  }

  ngOnInit(): void {
    this.token = this.customerService.getToken();
    var decoded = jwt_decode(this.token);
    console.log("decoded token is", decoded['_userName']);
    this.tokenValue = decoded['_userName'];
    console.log("add customer this.treeService.path is",this.treeService.path.length);
    if (this.treeService.path.length < 2) {
      this.path = '';
      
    } 
    else {
    this.path = this.treeService.path;
    }
    // console.log("path in form is ", this.treeService.path[this.treeService.path.length-1])
    console.log("path in form is ", this.treeService.path);
    console.log("this.path=this.treeService.path", this.path)
  }


  onSubmit(form: NgForm) {
    console.log("In customer Info component");
    this.customerService.postCustomer(form.value).subscribe(
      res => {
        console.log(res);
        console.log("save successfully");
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 3000);
        this.resetForm(form);
      },
      err => {
        
        if (err.status === 422) {
          console.log("error 422");
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          console.log("error ");
        this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.customerService.selectedCustomer = {
      company_id: '',
      company_name: '',
      address: '',
      createdBy: '',
      // path: [],
      path: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
