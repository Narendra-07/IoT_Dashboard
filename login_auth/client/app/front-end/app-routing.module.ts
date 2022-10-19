import { NgModule } from '@angular/core';
import { RouterModule,ROUTES,Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent} from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddDeviceComponent } from './add-device/add-device.component';
import {AngularTreeComponent} from './angular-tree/angular-tree.component';
import { MasterRegistrationComponent } from './master-registration/master-registration.component';
import { DeviceDataComponent } from './device-data/device-data.component';
import { DeviceManagementComponent } from './device-management/device-management.component';
import { LiveScreenComponent } from './live-screen/live-screen.component';


// const routes: Routes = [

  //  {path:'', component: SignInComponent},
  //  { path:'login', component: SignInComponent },
  //  { path:'signup', component: SignUpComponent,canActivate:[AuthGuard] },
  //  { path:'home', component: HomeComponent ,canActivate:[AuthGuard]},
  //  {path: 'add-customer', component: AddCustomerComponent,canActivate:[AuthGuard]},
  //  {path: 'add-device', component: AddDeviceComponent,canActivate:[AuthGuard]},
  //  {path: 'angular-tree', component: AngularTreeComponent,canActivate:[AuthGuard]},
  //  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},                 //protect userprofile route using AuthGuard class
  //  {path:'registration',component:MasterRegistrationComponent,canActivate:[AuthGuard]},
  //  {path: 'devicedata', component:DeviceDataComponent, canActivate:[AuthGuard]}       

// ];

@NgModule({
  imports: [RouterModule.forRoot([
    {
    path: '', component: HomeComponent,canActivate:[AuthGuard],
    children: [
      { path:'signup', component: SignUpComponent,canActivate:[AuthGuard] },
      {path: 'add-customer', component: AddCustomerComponent,canActivate:[AuthGuard]},
      {path: 'add-device', component: AddDeviceComponent,canActivate:[AuthGuard]},
      {path: 'angular-tree', component: AngularTreeComponent,canActivate:[AuthGuard]},
      // { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},                 //protect userprofile route using AuthGuard class
      // {path:'registration',component:MasterRegistrationComponent,canActivate:[AuthGuard]},
      {path: 'devicedata', component:DeviceDataComponent, canActivate:[AuthGuard]},
      {path: 'devicemanagement', component:DeviceManagementComponent, canActivate:[AuthGuard]},
      {path: 'livescreen', component:LiveScreenComponent, canActivate:[AuthGuard]},
      { path:'',  component: DeviceDataComponent, canActivate:[AuthGuard]}
      ]
    }, 
    { path:'login', component: SignInComponent },
    { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
    { path:'', component: SignInComponent }
])],
exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[HomeComponent,SignUpComponent,SignInComponent,UserProfileComponent,UserComponent,AddCustomerComponent,AddDeviceComponent,DeviceDataComponent, DeviceManagementComponent, LiveScreenComponent]
