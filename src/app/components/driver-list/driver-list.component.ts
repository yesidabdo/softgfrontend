import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})

export class DriverListComponent implements OnInit {
  
  drivers?: Driver[];
  currentDriver: Driver = {};
  currentIndex = -1;
  title = '';
  notifier;
  constructor(private driverService: DriverService,
     private router: Router,
     private notifierService: NotifierService
     
     ) { 

      this.notifier=notifierService;
     }

  ngOnInit(): void {
    this.retrieveDrivers();
  }

  deleteDriver(): void {
    
    this.driverService.delete(this.currentDriver.id)
      .subscribe(
        response => {
          this.notifier.notify('success', 'Driver Deleted Succefully!');
          this.drivers= response;
          this.refreshList()
        }
        );
  }
  retrieveDrivers(): void {
    this.driverService.getAll()
      .subscribe({
       

      next:(data)=>{
          this.drivers=data;
        }

      });
        
  }

  refreshList(): void {
    this.retrieveDrivers();
    this.currentDriver = {};
    this.currentIndex = -1;
  }

  setActiveDriver(driver: Driver, index: number): void {
    this.currentDriver = driver;
    this.currentIndex = index;
  }

  

}
