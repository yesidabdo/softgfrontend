import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { DriverService } from 'src/app/services/driver.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Driver } from 'src/app/models/driver.model';
import { Vehicle } from 'src/app/models/vehicle.model';
@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css']
})

export class RouteListComponent implements OnInit {
  
  routes?: Route[];
  

  currentRoute: Route = {};
  currentIndex = -1;
  title = '';
  notifier;
  constructor(private routeService: RouteService,
    
     private router: Router,
     private notifierService: NotifierService
     
     ) { 

      this.notifier=notifierService;
     }

  ngOnInit(): void {
    this.retrieveRoutes();
  }

  deleteRoute(): void {
    
    this.routeService.delete(this.currentRoute.id)
      .subscribe(
        response => {
          this.notifier.notify('success', 'Route Deleted Succefully!');
          this.routes= response;
          this.refreshList()
        },
          
        error => {
          console.log(error);
        });
  }
  retrieveRoutes(): void {
    this.routeService.getAll()
      .subscribe({
       

      next:(data)=>{
          this.routes=data;
        }

      });
        
  }

  refreshList(): void {
    this.retrieveRoutes();
    this.currentRoute = {};
    this.currentIndex = -1;
  }

  setActiveRoute(route: Route, index: number): void {
    this.currentRoute = route;
    this.currentIndex = index;
   
  }

  
  
 
}
