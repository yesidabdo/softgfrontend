import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { VehicleAddComponent } from './components/vehicle-add/vehicle-add.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { RouteAddComponent } from './components/route-add/route-add.component';
import { RouteDetailsComponent } from './components/route-details/route-details.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptorProviders } from './services/auth-interceptor';
import { LoginActivate } from './providers/login-active.provider';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { DataTablesModule } from "angular-datatables";




@NgModule({
  declarations: [
    AppComponent,
    AddDriverComponent,
    DriverDetailsComponent,
    DriverListComponent,
    VehicleAddComponent,
    VehicleDetailsComponent,
    VehicleListComponent,
    RouteListComponent,
    RouteAddComponent,
    RouteDetailsComponent,
    LoginComponent,
    ScheduleComponent,          
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    MatSlideToggleModule,
    DataTablesModule,
    NotifierModule.withConfig({
      position: { horizontal: { position: 'right'}, vertical:{position:'top'}},
      behaviour: { autoHide: 3000, },
    })
    
    
  ],
  providers: [authInterceptorProviders,LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
