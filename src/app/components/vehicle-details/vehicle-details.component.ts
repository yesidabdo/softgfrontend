import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {

  currentVehicle: Vehicle = {};
  notifier;


  message = '';

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService
    ) { 

      this.notifier = notifierService;

    }

  ngOnInit(): void {
    this.message = '';
    this.getVehicle(this.route.snapshot.params['id']);
    

  }

  getVehicle(id: string): void {
    this.vehicleService.get(id)
    .subscribe({
      next:(data) => {
        this.currentVehicle= data;
      }
     });
    }
  
  

  updateVehicle(): void {
    this.message = '';
    console.log
    this.vehicleService.update(this.currentVehicle.id, this.currentVehicle)
      .subscribe(
        response => {
          this.notifier.notify('success','Vehicle Updated Succefully');
          
          

          this.router.navigate(['/vehicles']);
        },
        error => {
          console.log(error);
        });
  }

  deleteVehicle(): void {
    this.vehicleService.delete(this.currentVehicle.id)
      .subscribe(
        response => {
          this.notifier.notify('success', 'Vehicle Deleted!');
          this.router.navigate(['/vehicles']);
        },
        error => {
          console.log(error);
        });
  }
}