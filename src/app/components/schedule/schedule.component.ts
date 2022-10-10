import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import { Subject } from 'rxjs';

import { Route } from 'src/app/models/route.model';
import { Schedule } from 'src/app/models/schedule.model';


import { Router } from '@angular/router';
import { RouteService } from 'src/app/services/route.service';
import { SheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.component.html'
})
export class ScheduleComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  schedules: Schedule[] = [];
  newSchedule:Schedule={active:false};
  routes: Route[]=[];
  willUpdate=false;

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private router: Router, private notifierService: NotifierService,  private scheduleService: SheduleService, private routeService: RouteService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',      
    };

    this.getSchedule();
    this.getRoutes();

  }

    getSchedule():void{
    this.scheduleService.getAll()
      .subscribe(data => {
        this.schedules = data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next('');
      });
    }

    saveSchedule(): void {
      this.scheduleService.create(this.newSchedule)
        .subscribe(
          response => {
            console.log(response);            
            this.notifierService.notify('success', 'Schedule created succefully!');
            this.dtTrigger.unsubscribe();
            this.getSchedule();
          },
          error => {
            console.log(error);
          });
    }

    updateSchedule(): void {
      this.scheduleService.update(this.newSchedule.id,this.newSchedule)
        .subscribe(
          response => {
            console.log(response);            
            this.notifierService.notify('success', 'Schedule updated succefully!');
            this.dtTrigger.unsubscribe();
            this.getSchedule();
            
            this.clearForm();
          },
          error => {
            console.log(error);
          });
    }

    deleteSchedule(id:number): void {
      this.scheduleService.delete(id)
        .subscribe(
          response => {
            console.log(response);            
            this.notifierService.notify('success', 'Schedule deleted succefully!');
            this.dtTrigger.unsubscribe();
            this.getSchedule();            
            this.clearForm();
          },
          error => {
            console.log(error);
          });
    }
    
    clearForm(){
      this.willUpdate=false
      this.newSchedule={active:false};
    }
    getRoutes():void{
      this.routeService.getAll()
        .subscribe(data => {
          this.routes = data;
          // Calling the DT trigger to manually render the table
          
        });
      }

  editSchedule(schedule: Schedule):void{
    this.willUpdate=true;
    this.newSchedule= schedule;
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
