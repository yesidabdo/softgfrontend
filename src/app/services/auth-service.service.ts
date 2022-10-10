import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrlLogin;
const headers = new HttpHeaders();

headers.append('Content-Type', 'application/json; charset=utf-8')

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string ) {
    return this.http.post<User>(`${baseUrl}`, {email, password},{headers})   
        
    
}
 setSession(authResult:any) {
  const expiresAt = moment().add(authResult.authorisation.expiresIn,'second');
  
  localStorage.setItem('id_token', authResult.authorisation.token);
  localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
}          

logout() {
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
}

public isLoggedIn() {
  
  return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
  return !this.isLoggedIn();
}

getExpiration() {
  const expiration = localStorage.getItem("expires_at")||'';
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}    
}
