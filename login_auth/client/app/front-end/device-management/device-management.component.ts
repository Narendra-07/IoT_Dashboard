import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DeviceManagementService } from '../device-management.service';
import { DeviceDataTable } from '../../device-data-table';
import { TreeService } from '../service/treeService';
import { EMPTY, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { NonNullableFormBuilder } from '@angular/forms';

const COLUMNS_SCHEMA = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  // {
  //   key: "ModifiedDate",
  //   type: "string",
  //   label: "ModifiedDate"
  // },
  // {
  //   key: "UID",
  //   type: "string",
  //   label: "UID"
  // },
  {
      key: "TagId",
      type: "string",
      label: "TagId",
      required: true,
  },
  {
      key: "TagName",
      type: "string",
      label: "TagName",
      required: true
  },
  {
      key: "Unit",
      type: "string",
      label: "Unit",
      required: true
  },
  {
      key: "Scale",
      type: "number",
      label: "Scale",
      required: true
  },
  {
      key: "OffSet",
      type: "number",
      label: "OffSet"
  },
  {
    key: "Minimum",
    type: "number",
    label: "Minimum",
    required: true
  },
  {
    key: "Maximum",
    type: "number",
    label: "Maximum",
    required: true
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]

@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.css']
})
export class DeviceManagementComponent implements OnInit {
  displayedColumns: string[] = COLUMNS_SCHEMA.map(col => col.key);
  dataSource: any = [];
  columnsSchema: any = COLUMNS_SCHEMA;
  status;
  _id;
  isDisabled;
  public displayUID;
  public displayDeviceName;
  public updateData;
  dataToDisplay: DeviceDataTable[] = [];
  subscription: Subscription;
  

  constructor(private http: HttpClient, public dialog: MatDialog, private deviceManagementService: DeviceManagementService, private treeService: TreeService) { }
   addRow() {
    const newRow = {
      _id: "newID",
      isEdit: true,
      ModifiedDate: new Date(Date.now()),
      UID: this.displayUID,
      TagId: '',
      TagName: '',
      Unit: '',
      Scale: '',
      OffSet: '',
      Minimum: '',
      Maximum: ''
    }; 
    this.dataSource = [newRow, ...this.dataSource];
  }

  fetchDeviceManagementData() {
  this.deviceManagementService.fetchDeviceManagementData(this.displayUID).subscribe(
    data =>
    {
    this.dataSource = data;
    console.log("In fetchDeviceManagementData funct data is", data)});
    }

  createRow(element: any) { 
    console.log("In createRow funct element is",element);
    this.isDisabled = false;
    var element1 = {
      ModifiedDate: element.ModifiedDate,
      UID: element.UID,
      TagId: element.TagId,
      TagName: element.TagName,
      Unit: element.Unit,
      Scale: element.Scale,
      OffSet: element.OffSet,
      Minimum: element.Minimum,
      Maximum: element.Maximum
    }
    console.log("In createRow funct element1 is",element1);
    this.deviceManagementService.createDeviceManagementData(element1).subscribe(
      data => 
      {
        console.log("In CreateDeviceManagementData funct createdRow is", data);
      });
  }
  updateRow(element: any) {
      console.log("In updateDeviceManagementData funct element is", element);
      this.deviceManagementService.updateDeviceManagementData(element,element._id).subscribe(
        data => {
          this.status = 'updated successful';
         console.log("In updateDeviceManagementData funct updatedRow data is", data);
         console.log(this.status);
        }
      );
  }
  valueModified(element: any) { 

    console.log("element._id is",element._id);
    if(element._id == "newID") {
      this.createRow(element);
    }
    else {
      this.updateRow(element);
    }
}
validateElement(element: any) {
  element._id == null;
  element.ModifiedDate == null;
  element.UID == null;
  element.TagId == null;
  element.TagName == null;
  element.Unit == null;
  element.Scale == null;
  element.OffSet == null;
  element.Minimum == null;
  element.Maximum == null
}
  deleteRowById(element: any) {
    this.dataSource = this.dataSource.filter((u) => u._id !== element._id);
    console.log("deleteRowById _id is",element._id);
      this.deviceManagementService.deleteDeviceManagementDataById(element._id).subscribe(
        () => {
          this.status = 'Delete successful';
          console.log(this.status);
        }                                                     
      ); 
  }
  deleteRowByUID(displayUID: any) {
    this.displayUID = this.treeService.sharedUID;
    console.log("deleteRowByUID UID is",this.displayUID);
    this.deviceManagementService.deleteAllDeviceManagementDataByUId(this.displayUID).subscribe(
      () => {
        this.dataSource = this.fetchDeviceManagementData();
        this.status = 'Delete successful';
        console.log(this.status);
      } 
    );
  }

  removeSelectedRows() {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.dataSource = this.dataSource.filter((u: any) => !u.isSelected);
        }
      });
  } 
  
  ngOnInit(): void {
    this.isDisabled = false;
    this.subscription = this.treeService.navItem3$.subscribe(
      item => {
      this.displayUID = this.treeService.sharedUID;
      this.displayDeviceName = this.treeService.path;
      var indexOfSlash = this.displayDeviceName.lastIndexOf('/') + 1; 
      this.displayDeviceName = this.displayDeviceName.slice(indexOfSlash,this.displayDeviceName.length);
      console.log("this.displayUID is", this.displayUID);
      });
      this.fetchDeviceManagementData();
  };
  
}
