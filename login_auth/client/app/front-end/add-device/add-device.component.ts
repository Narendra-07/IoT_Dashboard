import { Component, OnInit } from '@angular/core';
import { deviceService } from '../service/device.service';
import { NgForm } from '@angular/forms';
import { TreeService } from '../service/treeService';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  token;
  tokenValue;
  path;

  constructor(public deviceService:deviceService,  public treeService: TreeService) { }

  ngOnInit(): void {
    this.token = this.deviceService.getToken();
    var decoded = jwt_decode(this.token);
    console.log("decoded token is", decoded['_userName']);
    this.tokenValue = decoded['_userName'];
    this.path = this.treeService.path;
    console.log("path in form is ", this.treeService.path);
    console.log("this.path=this.treeService.path is", this.path)
   }
   onSubmit(form: NgForm) {
    console.log("In device Info component");
  
    form.value.deviceName = this.path + "/" + form.value.deviceName;
    console.log ("form.value.deviceName is",form.value.deviceName)
    this.deviceService.postDevice(form.value).subscribe(
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
          console.log("error ",err);
        this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.deviceService.selectedDevice = {
    UID:"" ,
    deviceName:"",
    createdBy:""
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
