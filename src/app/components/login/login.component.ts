import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  form:FormGroup;

    constructor(private fb:FormBuilder, 
                 private authService: AuthServiceService, 
                 private router: Router,
                 ) {

        this.form = this.fb.group({
            email: ['',[Validators.required,Validators.email]],
            password: ['',Validators.required]
        });
    }

    ngOnInit(): void {
      this.checkLogin();
    }

    checkLogin(){
      if (this.authService.isLoggedIn()){     
        this.router.navigate(['/drivers']);
        
      }
    }

    login() {
        const val = this.form.value;
      
        if (val.email && val.password) {
            this.authService.login(val.email, val.password)
                .subscribe({
                    next:(data) => {
                        console.log("User is logged in");
                        this.authService.setSession(data)
                        window.location.reload();
                        this.router.navigateByUrl('/drivers');
                    }
                  }
                );
        }
    }

}
