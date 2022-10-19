import { Injectable } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { customerService } from '../service/customer.service';
import { UsersService } from '../service/users.Service';
import { SelectionModel } from '@angular/cdk/collections';
import { UserService } from '../service/user.service';
import jwt_decode from 'jwt-decode';
import { DevicedataService } from '../../devicedata.service';
import { DeviceNameService } from '../device-name.service';
import { LiveScreenService } from '../../live-screen.service';
import { DeviceDataTable } from '../../device-data-table';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { lastIndexOf } from 'lodash';


// declare global {
//   var nodePath1: string;
// }

export interface viewTree {
  name: string;
  children?: viewTree[];
  //path: string;
}

let TREE_DATATemp: viewTree[] = [

  {
    name: 'EmbOne1',
    children: [
    ]
  }
];

/** Flat node with expandable and level information */
export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Injectable({ providedIn: 'root' })
export class TreeService {
  private _navItemSource = new BehaviorSubject(0);
  private _navItemSource1 = new BehaviorSubject(0);
  private _navItemSource2 = new BehaviorSubject(0);
  private _navItemSource3 = new BehaviorSubject(0);
  navItem$ = this._navItemSource.asObservable();
  navItem1$ = this._navItemSource1.asObservable();
  navItem2$ = this._navItemSource2.asObservable();
  navItem3$ = this._navItemSource3.asObservable();
  dataToPass: DeviceDataTable[] = [];
  dataPassToLive: DeviceDataTable;
  public varSelected : boolean;
  public token: any = [];
  public pathArray: any = [];
  public pathArray1: any = [];
  public company_name: any = [];
  public parentNodePath: any[] = [];
  public path : string;
  public login_path: any;
  sharedUID: string;
  
  // public path: any[] = [];
  // public path1: any[] = [];
  private transformer = (node: viewTree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  /** The selection for checklist */
  checklistSelection = new SelectionModel<ExampleFlatNode>(true);

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);              //user can expand and collapse tree node recursively

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);            //to tell dataSource how to build tree

  ngOnInitTemp(): void {
    console.log(" In Treeservice");
    const token = this.userService.getToken();
    var decoded = jwt_decode(token); 
    console.log("decoded['path']",decoded['path']);
    this.login_path = decoded['path'];
    this.token.push(token);
    console.log("this.login_path is",this.login_path);
    this.customerService.postCustomerPath(this.token).subscribe(
      // this.customerService.getCustomer().subscribe(
      res => {
        console.log("response is", res)
        this.createTreeData(res);
        this.dataSource.data = TREE_DATATemp;
      },
      err => {
        console.log(err);
      }
    );
  }

  createTreeData(res: any) {
    TREE_DATATemp = this.getTreeData(res);

    console.log("createTreeData", TREE_DATATemp);
  }

  getTreeData(res: any) {
    var findForwardSlash = this.login_path.lastIndexOf("/") + 1;
    console.log("findForwardSlash is",findForwardSlash);
    for (var i = 0; i < res.length; i++) {
     // var tempOb = res[i].company_name;
      // var tempOb1 = res[i].path[0];
      var tempOb1 = res[i].path;
      tempOb1 = tempOb1.slice(findForwardSlash,tempOb1.length);
      // var findForwardSlash = tempOb1.lastIndexOf("/") + 1;    
      // console.log("findForwardSlash is",findForwardSlash); 
      console.log("tempOb1 is",tempOb1);
     // this.company_name.push(tempOb);
      this.pathArray.push(tempOb1); 
    }
   console.log("this.pathArray is",this.pathArray); 
                            
    var returnTreeData = []; // this is tree stucture of JSON
    let path_names = this.pathArray;                   //path array of customer
    //let currentCompName_names = this.company_name;      //company name array of customer

    for (let CurrentPathindex = 0; CurrentPathindex < path_names.length; CurrentPathindex++) {
      let path_name = path_names[CurrentPathindex];
      //let currentCompName = currentCompName_names[CurrentPathindex];  //
      var curruntTreeObj = returnTreeData;  // restart from start  obj

      var path_arr = path_name.split('/');
      console.log("path_arr", path_arr);
      var path_arr_len = path_arr.length;
      console.log("path_arr_len", path_arr_len);

  
      // path_arr.push(currentCompName);

      path_arr.forEach(element => {
        // search existing array element
        let childIndex = -1;
        for (let index = 0; index < curruntTreeObj.length; index++) {
          if (curruntTreeObj[index].name == element) {
            childIndex = index;
          }
        }
        // console.log("In getTreeData curruntTreeObj ", curruntTreeObj);
        // console.log("In getTreeData curruntTreeObj childIndex ", childIndex);

        if (childIndex >= 0) {
          // here element found
          let currentObj = curruntTreeObj[childIndex];
          curruntTreeObj = currentObj.children;
          console.log("curruntTreeObj = currentObj.children", curruntTreeObj)
        }
        else {
          var tempVarObj: viewTree = {
            name: '',
            children: []
          };
          console.log("tempVarObj", tempVarObj)
          tempVarObj.name = element;
          tempVarObj.children = [];
          curruntTreeObj.push(tempVarObj);
          console.log(" curruntTreeObj.push(tempVarObj)", curruntTreeObj,)
          curruntTreeObj = tempVarObj.children;
        }
      }
      );
    }
    return returnTreeData;
  }

  constructor(private route:Router, private devicedataService: DevicedataService, public customerService: customerService, public usersService: UsersService, private userService: UserService, private deviceNameService: DeviceNameService) {
    //   this.ngOnInitTemp(); 
  }
    go() {
		this.route.navigate(['/devicedata']); // navigate to other page
   }
   
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  logNode(node: any) {
    //this.todoItemSelectionToggle(node);
    let level = node.level;
    var Node = node.name;
    let nodePath: String = '';
    while (level > 0) {
      node = this.getParentNode(node);
      var nameTemp = node.name + '/'
      nodePath = nameTemp + nodePath;
      level--;
      
    }
    var varSelectedName = this.checklistSelection.isSelected(node);

    console.log("varSelected is",varSelectedName);
    //this._navItemSource1.next(0);
    var nodePath1 = nodePath + Node;      //get path parent node/current node
    // this.go();
  

   // find last forward slash from login path
   var indexOfSlash = this.login_path.lastIndexOf("/") +1;

   // find all characters before that forward slash

   var pathBeforeSlash = this.login_path.slice(0,indexOfSlash);
   // then append that characters in this.path 

    this.path =  pathBeforeSlash + nodePath1;
    nodePath1 = this.path;
    
    //this.path.push(nodePath1); //= "nodePath1";
    console.log(" In treeservice full path", this.path);
      console.log("In treeservice nodepath1 onClick()");
      
      
       
      this.devicedataService.getDeviceData (nodePath1).subscribe(
            data =>
        {
         this.dataToPass = data.resDeviceData;   
         console.log('Recieved data is 1 :',data);
         console.log('received data is 2:',data.resDeviceData);         
         this._navItemSource.next(0);  
        });
        this.go();

        this.deviceNameService.getUID (nodePath1).subscribe(
          data=>
          {
         this.sharedUID = data.UID;
         console.log("In treeservice getUID funct's this.sharedUID is", this.sharedUID);
         this._navItemSource3.next(0);
        });
    
  }
  
  getLevel = (node: ExampleFlatNode) => node.level;

  /* Get the parent node of a node */
  getParentNode(node: ExampleFlatNode): ExampleFlatNode | null {
    const currentLevel = this.getLevel(node);
    

    // console.log('currentLevel ', currentLevel);
    if (currentLevel < 0) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    // console.log('startIndex is ', startIndex);
    for (let i = startIndex; i >= 0; i--) {

      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;

      }
    }
    return null;
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
todoItemSelectionToggle(node: ExampleFlatNode): void {
  console.log("todoItemSelectionToggle in tree service is",this.todoItemSelectionToggle);
  // HERE IS WHERE THE PART OF THE MODEL RELATED TO THE CLICKED CHECKBOX IS UPDATED
  this.checklistSelection.toggle(node); 


  // HERE WE GET POTENTIAL CHILDREN OF THE CLICKED NODE this.treeControl.dataNodes[0]
 //const descendants = this.treeControl.getDescendants(node);
 //console.log("todoItemSelectionToggle this.treeControl.dataNodes[0] is ",descendants);
 //this.checklistSelection.deselect(...descendants);

  this.varSelected = this.checklistSelection.isSelected(node);
  this._navItemSource1.next(0);
  console.log("todoItemSelectionToggle varSelected is ",this.varSelected);
  

   // HERE IS WHERE THE REST OF THE MODEL (POTENTIAL CHILDREN OF THE CLICKED NODE) IS UPDATED
  // this.checklistSelection.isSelected(node) 
  //   ? this.checklistSelection.select(...descendants)
  //   : this.checklistSelection.deselect(...descendants);
}
}

