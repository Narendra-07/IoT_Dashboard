import { Component } from '@angular/core';
import { customerService } from '../service/customer.service';
import { TreeService } from '../service/treeService';


@Component({
  selector: 'app-angular-tree',
  templateUrl: './angular-tree.component.html' , 
  styleUrls: ['./angular-tree.component.css']
})
  
export class AngularTreeComponent {
  public path:any = [];
  constructor(public customerService: customerService,public treeService:TreeService) { 
  treeService.ngOnInitTemp();
  // this.path=  treeService.ngOnInitTemp();
  }
}
