import { Component, OnInit } from '@angular/core';
import { Driver } from 'src/app/models/driver.model';
import { DriverService } from 'src/app/services/driver.service'
import { FormsModule } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
    driver:Driver={};
    notifier;
    
   clearDriver():void{
    this.driver= {
      first_name:'',
      last_name:'',
      ssd:'',
      dob:'',
      address:'',
      city:'',
      zip:'',
      phone:0,
      active:false
   } 

    
  };
  submitted = false;

  constructor(private DriverService: DriverService,
      notifierService: NotifierService, 
      private router: Router) 
  
  { 
     this.notifier=notifierService;    
    }

  ngOnInit(): void {
  }

  saveDriver(): void {

    const data:any = {
      first_name: this.driver.first_name,
      last_name: this.driver.last_name,
      ssd: this.driver.ssd,
      zip: this.driver.zip,
      phone: this.driver.phone,
      dob: this.driver.dob,
      city: this.driver.city,
      address: this.driver.address,
      active: this.driver.active || false  

    };



    this.DriverService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.notifier.notify('success', 'Driver created succefully!')
          this.router.navigate(['/drivers'])
        },
        error => {
          console.log(error);
        });
  }

  newDriver(): void {
    this.submitted = false;
    //this.clearDriver();
  }
  
}
