import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from 'src/app/models/driver.model';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {

  currentDriver: Driver = {};
  notifier;


  message = '';

  constructor(
    private driverService: DriverService,
    private route: ActivatedRoute,
    private router: Router,
    notifierService: NotifierService
    ) { 

      this.notifier = notifierService;

    }

  ngOnInit(): void {
    this.message = '';

    const id= this.route.snapshot.params['id'];
    this.getDriver(id);
    

  }

  getDriver(id: string): void {
    this.driverService.get(id)
    .subscribe({
      next:(data)=>{
        console.log(data);
        this.currentDriver= data;
      }
    });
    }
  
    

  updatePublished(status: boolean): void {
    const data = {
      title: this.currentDriver.first_name,
      description: this.currentDriver.ssd,
      published: status
    };

    this.message = '';
    
    this.driverService.update(this.currentDriver.id, data)
      .subscribe(
        response => {
          this.currentDriver.active = status;
          console.log(response);
          this.message = response.message ? response.message : 'The status was updated successfully!';
        });
  }

  updateDriver(): void {
    this.message = '';
    this.driverService.update(this.currentDriver.id, this.currentDriver)
      .subscribe(
        response => {
          this.notifier.notify('success','Driver Updated Succefully');               
          this.router.navigate(['/drivers']);
        });
  }

  deleteDriver(): void {
    this.driverService.delete(this.currentDriver.id)
      .subscribe(
        response => {
          this.notifier.notify('success', 'Driver Deleted!');
          this.router.navigate(['/drivers']);
        });
  }
}