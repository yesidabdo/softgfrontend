import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrlDriver;
const headers = new HttpHeaders();

headers.append('Content-Type', 'application/json; charset=utf-8')




      
      
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) {}

   getAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(baseUrl);
  }

  get(id: any): Observable<Driver> {
    console.log(id);
    return this.http.get<Driver>(`${baseUrl}/${id}`,{headers});
  }

  create(data: any): Observable<any> {
    
    return this.http.post(baseUrl, JSON.stringify(data),{headers});
  }

  update(id: any, data: any): Observable<any> {
    
    return this.http.put(`${baseUrl}/${id}`, JSON.stringify(data),{headers});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`,{headers});
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl,{headers});
  }

  findByTitle(title: any): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${baseUrl}?title=${title}`,{headers});
  }

}



