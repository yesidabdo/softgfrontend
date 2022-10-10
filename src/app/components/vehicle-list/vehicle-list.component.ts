import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})

export class VehicleListComponent implements OnInit {
  
  vehicles?: Vehicle[];
  currentVehicle: Vehicle = {};
  currentIndex = -1;
  title = '';
  notifier;
  constructor(private vehicleService: VehicleService,
     private router: Router,
     private notifierService: NotifierService
     
     ) { 

      this.notifier=notifierService;
     }

  ngOnInit(): void {
    this.retrieveVehicles();
  }

  deleteVehicle(): void {
    
    this.vehicleService.delete(this.currentVehicle.id)
      .subscribe(
        response => {
          this.notifier.notify('success', 'Vehicle Deleted Succefully!');
          this.vehicles= response;
          this.refreshList()
        });
  }
  retrieveVehicles(): void {
    this.vehicleService.getAll()
      .subscribe({
       

      next:(data)=>{
          this.vehicles=data;
        }

      });
        
  }

  refreshList(): void {
    this.retrieveVehicles();
    this.currentVehicle = {};
    this.currentIndex = -1;
  }

  setActiveVehicle(vehicle: Vehicle, index: number): void {
    this.currentVehicle = vehicle;
    this.currentIndex = index;
  }

  

  
}
