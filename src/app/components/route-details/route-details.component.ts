import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { NotifierService } from 'angular-notifier';
import { Vehicle } from 'src/app/models/vehicle.model';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  currentRoute: Route = {};
  notifier;
  vehicles: Vehicle[]=[];
  drivers: Driver[]= [];

  message = '';

  constructor(
    private routeService: RouteService,
    private driverService: DriverService,
    private vehicleService: VehicleService, 
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService
    ) { 

      this.notifier = notifierService;

    }

  ngOnInit(): void {
    this.message = '';
    this.getRoute(this.route.snapshot.params['id']);
    this.getDrivers();
    this.getVehicles();
    

  }

  getRoute(id: string): void {
    this.routeService.get(id)
    .subscribe({
      next:(data) => {
        this.currentRoute= data;
      }
     });
    }
  
  

  updateRoute(): void {
    this.message = '';
    console.log
    this.routeService.update(this.currentRoute.id, this.currentRoute)
      .subscribe(
        response => {
          this.notifier.notify('success','Route Updated Succefully');
          
          

          this.router.navigate(['/routes']);
        });
  }

  deleteRoute(): void {
    this.routeService.delete(this.currentRoute.id)
      .subscribe(
        response => {
          this.notifier.notify('success', 'Route Deleted!');
          this.router.navigate(['/routes']);
        },
        error => {
          console.log(error);
        });
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
