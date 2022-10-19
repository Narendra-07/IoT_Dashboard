import { Component, OnInit,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DeviceDataTable } from '../../device-data-table';
// import { LiveScreenComponent } from '../live-screen/live-screen.component';
import { TreeService } from '../service/treeService';
import {FormGroup, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexTooltip,
  ApexMarkers,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  tooltip: ApexTooltip;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
 
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.css']
  
})  
  
export class DeviceDataComponent implements OnInit {
  
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  subscription: Subscription;
  dataToShow: DeviceDataTable[] = [];
  public displayUID;
  public displayDeviceName: string | undefined;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public activeOptionButton = "all";
  public updateOptionsData = {
    //  "dateRangeChange": { },
    "1m": {
      xaxis: {
        min: new Date(Date.now() - 1000*60*60*24*30 ).getTime(),
        max: new Date(Date.now()).getTime()
      }
    },

   "6m": {
    xaxis: {
      min: new Date(Date.now() - 1000*60*60*24*182).getTime(),
      max: new Date(Date.now()).getTime()
    }
   },

   "1y": {
    xaxis: {
      min: new Date(Date.now() - 1000*60*60*24*365).getTime(),
      max: new Date(Date.now()).getTime()
    }
   },

   "ytd": {
    xaxis: {
      min: new Date(Date.now() - 1000*60*60*24*58).getTime(),
      max: new Date(Date.now()).getTime()
    }
   },

    all: {
      xaxis: {
        min: undefined,
        max: undefined
      }
    },
  };  
   public updateOptions(option: any): void {
    console.log("this.range.get('start').value is",this.range.get('start').value);
    console.log("this.range.get('end').value is",this.range.get('end').value);
    console.log("option in updateOptions",option);
    this.activeOptionButton = option;
    console.log("this.updateOptionsData[option] is",this.updateOptionsData[option]);
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }

  constructor(private route:Router, public http:HttpClient, private treeservice: TreeService) { }

  go() {
		this.route.navigate(['/devicemanagement']); // navigate to other page
   }

  ngOnInit(): void {
    this.displayDeviceName = "Please Select Device";

  //  this.dataToShow = this.treeservice.dataToPass;
   this.subscription = this.treeservice.navItem$.subscribe(
    item =>
    {
     console.log("new Date(Date.now())",new Date(Date.now()));
     console.log("this.range.get('start').value is",this.range.get('start').value);
     console.log("I am in device-data subscription this.treeservice.path is",this.treeservice.path);

     this.dataToShow = this.treeservice.dataToPass;
     if((this.treeservice.path != undefined)) {
      if ( (this.treeservice.path.length>0 )  ) {
      this.displayDeviceName = this.treeservice.path;
      console.log("this.displayDeviceName is",this.displayDeviceName);
      this.displayDeviceName.length;
      console.log("this.displayDeviceName.length is",this.displayDeviceName.length);
      var indexOfSlash = this.displayDeviceName.lastIndexOf('/') + 1; 
      this.displayDeviceName = this.displayDeviceName.slice(indexOfSlash,this.displayDeviceName.length);
     }
     else {
      this.displayDeviceName = "Please Select Device";
      console.log("in else part of subscription");
     }
    }
  
     if ( this.dataToShow.length>0 ) {
      this.displayUID = this.dataToShow[0].UID;
     }
     else {
      this.displayUID = undefined;
     }

     var d1Values = [];                      
     var d2Values = [];               
     var d3Values = [];                           
     var dateTimeValues = [];               
     
     for(let show of this.dataToShow) {
      
        d1Values.push(show.D1);      
        d2Values.push(show.D2);
        d3Values.push(show.D3);
        dateTimeValues.push(show.DateTime);
       }                                           
     this.chartOptions = {
      series: [
        {
          name: "D1",
          // data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 150]
          data: d1Values
        },
        {
          name: "D2",
          data: d2Values
        },
        {
          name: "D3",
          data: d3Values
        }
      ],
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      // title: {
      //   text: "Product Trends by Month",
      //   align: "left"
      // },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: dateTimeValues,
        type: "datetime",
      }, 
       tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      }
    };     
  }
   );               
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  } 
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
    this.chart.updateOptions({xaxis: {
      min: new Date(dateRangeStart.value).getTime(),
      max: new Date(dateRangeEnd.value).getTime()
      }}, false, true, true);  
  }
}

