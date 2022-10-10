import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route.model';
import { Driver } from 'src/app/models/driver.model';
import { RouteService } from 'src/app/services/route.service'
import { FormsModule } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

import { DriverService } from 'src/app/services/driver.service';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './route-add.component.html',
  styleUrls: ['./route-add.component.css']
})
export class RouteAddComponent implements OnInit {
    route:Route={};
    drivers:Driver[]=[];
    vehicles:Vehicle[]=[];
    
   clearRoute():void{
    this.route= {
      
   } 

    
  };
  submitted = false;

  constructor(private RouteService: RouteService,
      private driverService: DriverService,
      private vehicleService: VehicleService,
      private notifierService: NotifierService, 
      private router: Router) 
      {}

  ngOnInit(): void {
    this.getDrivers();
    this.getVehicles();
  }

  saveRoute(): void {

    const data:Route = {
      description: this.route.description,
      driver_id: this.route.driver_id,
      vehicle_id: this.route.vehicle_id,      
      active: this.route.active || false  

    };



    this.RouteService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.notifierService.notify('success', 'Route created succefully!')
          this.router.navigate(['/routes'])
        },
        error => {
          console.log(error);
        });
  }

  newRoute(): void {
    this.submitted = false;
    //this.clearRoute();
  }


  getDrivers():void{
    this.driverService.getAll()
    .subscribe({
      next:(data)=>{
        this.drivers = data;
      }
    })
  }

  getVehicles():void{
    this.vehicleService.getAll()
    .subscribe({
      next:(data)=>{
        this.vehicles = data;
      }
    })
  }
}

