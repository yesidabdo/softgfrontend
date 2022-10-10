import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDriverComponent } from './components/add-driver/add-driver.component';
import { DriverDetailsComponent } from './components/driver-details/driver-details.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { LoginComponent } from './components/login/login.component';
import { RouteAddComponent } from './components/route-add/route-add.component';
import { RouteDetailsComponent } from './components/route-details/route-details.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { VehicleAddComponent } from './components/vehicle-add/vehicle-add.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { LoginActivate } from './providers/login-active.provider';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component:LoginComponent},  
{path: 'drivers', component:DriverListComponent,canActivate:[LoginActivate]},
{path: 'drivers/:id', component: DriverDetailsComponent,canActivate:[LoginActivate]},
{path: 'drivers.add', component:AddDriverComponent,canActivate:[LoginActivate]},

{path: 'vehicles', component:VehicleListComponent,canActivate:[LoginActivate]},
{path: 'vehicles/:id', component: VehicleDetailsComponent,canActivate:[LoginActivate]},
{path: 'vehicles.add', component:VehicleAddComponent,canActivate:[LoginActivate]},

{path: 'schedule', component:ScheduleComponent,canActivate:[LoginActivate]},

{path: 'routes', component:RouteListComponent,canActivate:[LoginActivate]},
{path: 'routes/:id', component:RouteDetailsComponent,canActivate:[LoginActivate]},
{path: 'routes.add', component:RouteAddComponent,canActivate:[LoginActivate]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
