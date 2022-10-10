import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrlVehicle;
const headers = new HttpHeaders();

headers.append('Content-Type', 'application/json; charset=utf-8')




      
      
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {}

   getAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(baseUrl);
  }

  get(id: any): Observable<Vehicle> {
    
    return this.http.get(`${baseUrl}/${id}`,{headers});
  }

  create(data: any): Observable<any> {
    
    return this.http.post(baseUrl, JSON.stringify(data),{headers});
  }

  update(id: any, data: any): Observable<any> {
    console.log(data);
    return this.http.put(`${baseUrl}/${id}`, JSON.stringify(data),{headers});
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`,{headers});
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl,{headers});
  }

  findByTitle(title: any): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${baseUrl}?title=${title}`,{headers});
  }

}



