import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service'
import { FormsModule } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {
    vehicle:Vehicle={};
    notifier;
    
   clearVehicle():void{
    this.vehicle= {
      
   } 

    
  };
  submitted = false;

  constructor(private VehicleService: VehicleService,
      notifierService: NotifierService, 
      private router: Router) 
  
  { 
     this.notifier=notifierService;    
    }

  ngOnInit(): void {
  }

  saveVehicle(): void {

    const data:any = {
      description: this.vehicle.description,
      year: this.vehicle.year,
      make: this.vehicle.make,
      capacity: this.vehicle.capacity,      
      active: this.vehicle.active || false  

    };



    this.VehicleService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.notifier.notify('success', 'Vehicle created succefully!')
          this.router.navigate(['/vehicles'])
        },
        error => {
          console.log(error);
        });
  }

  newVehicle(): void {
    this.submitted = false;
    //this.clearVehicle();
  }
}
