import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { ChartType } from "angular-google-charts";
import { DeviceDataTable } from '../../device-data-table';
import { TreeService } from '../service/treeService';
import { Subscription, timer } from 'rxjs';
import { LiveScreenService } from '../../live-screen.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-live-screen',
  templateUrl: './live-screen.component.html',
  styleUrls: ['./live-screen.component.css']
})

export class LiveScreenComponent implements OnInit {

  public canvasWidth;
  public needleValue;
  public needleValue1;
  public centralLabel;
  public label;
  public options;  
  public valueOfPressure1;
  public valueOfPressure2;
  public valueOfPressure3;
  public valueOfPressure4;
  public timeDiffForLiveConnec;
  public deviceStatus;
  public tempDate;
  dataShowToLive: DeviceDataTable;
  subscription: Subscription;

  @ViewChild('googlechart')
  googlechart: GoogleChartComponent;
  chart = {
    type: ChartType.Gauge,
    data: [
      ['speed', 50],
      ['rpm', 60],
      ['cpu', 80] 
    ],
    options: {
      width: 400,
      height: 120,
      greenFrom: 0,
      greenTo: 75,
      redFrom: 90,
      redTo: 100,               
      yellowFrom: 75,
      yellowTo: 90,
      minorTicks: 5
    },
  };
  @Input() products$: Observable<any>;
  constructor(private treeservice: TreeService, private livesSreenService: LiveScreenService) { }
   
  ngOnInit(): void { 
    this.timeDiffForLiveConnec = 100000;
    this.valueOfPressure1 = 50;
    this.valueOfPressure2 = 40;
    this.valueOfPressure3 = 70;
    this.valueOfPressure4 = 110;

    this.canvasWidth = 300;
    this.needleValue = 50;
    this.needleValue1 = 80;
    this.centralLabel = '';

    console.log('In ngoninit funct001');
    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.livesSreenService.deviceLiveData(this.treeservice.path))
    ).subscribe(data => 
      { 
        this.dataShowToLive = data;
        console.log('Received devicelivedata is :', this.dataShowToLive);
        if((this.treeservice.path != undefined)) {
          if((this.treeservice.path.length>0)) {
          this.valueOfPressure1 = this.dataShowToLive.D2;
          this.valueOfPressure2 = this.dataShowToLive.D3;
          this.valueOfPressure3 = this.dataShowToLive.D4;
          this.valueOfPressure4 = this.dataShowToLive.D5;
   
          this.chart.data = [
           ['speed', Number(this.dataShowToLive.D6)],
           ['rpm', Number(this.dataShowToLive.D7)],
           ['cpu', Number(this.dataShowToLive.D8)] 
         ]
   
          this.needleValue = this.dataShowToLive.D9;
          this.needleValue1 = this.dataShowToLive.D10; 
           }
           else {
             console.log('In ngoninit funct004');
          this.valueOfPressure1 = 50;
          this.valueOfPressure2 = 40;
          this.valueOfPressure3 = 70;
          this.valueOfPressure4 = 110;
          this.chart.data = [
           ['speed', 50],
           ['rpm', 60],
           ['cpu', 80] 
         ]
         this.needleValue = 50;
         this.needleValue1 = 80;
         }
       } 
    
       var tempSeconds = new Date(Date.now()).getTime();
       this.tempDate= ""+this.dataShowToLive.DateTime;
         console.log("tempDate is",this.tempDate);
       var tempSeconds1 = new Date(this.tempDate).getTime(); 
        console.log("tempSeconds is", tempSeconds);
        console.log("tempSeconds1 is", tempSeconds1);
        console.log("tempSeconds - tempSeconds1",tempSeconds - tempSeconds1);

         if((tempSeconds - tempSeconds1) < this.timeDiffForLiveConnec ) {
          this.deviceStatus = true;
          console.log("device is connected");
        }
        else {
          this.deviceStatus = false;
          console.log("device is not connected");
        }
       }); 
            
      this.options = { 
      hasNeedle: true,
      needleColor: 'grayblack',
      needleUpdateSpeed: 800,
      arcColors: ['green','green','green', 'yellow','yellow','yellow','yellow','red','red','red'],
      arcDelimiters: [10,20,30,40,50,60,70,80,90],
      rangeLabel: ['0', '100'],
      needleStartValue: 0,
      arcLabels:['10','20','30','40','50','60','70','80','90'],
      arcpadding: 3
    }
  }  
    ngOnDestroy() {
    this.subscription.unsubscribe();
}
}
 
 