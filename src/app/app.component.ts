import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLogged=false;
  title = 'AngularSoftG';

  constructor(private authService: AuthServiceService,private router: Router){}

  ngOnInit(): void {
    this.checkLogin();
  }

   set setLogged(logged:boolean){
    this.isLogged= logged;
  }

  checkLogin():void{
    if (this.authService.isLoggedIn()){
      this.isLogged=true
    }else{
      this.isLogged=false
    }    
  }


  logout():void{
this.authService.logout()
window.location.reload();


}

}
