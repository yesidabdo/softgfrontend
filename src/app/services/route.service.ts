import { Injectable } from '@angular/core'
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Route } from '../models/route.model';
import { environment } from 'src/environments/environment';


const baseUrl = environment.baseUrlRoute;
const headers = new HttpHeaders();

headers.append('Content-Type', 'application/json; charset=utf-8')




      
      
@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) {}

   getAll(): Observable<Route[]> {
    return this.http.get<Route[]>(baseUrl);
  }

  get(id: any): Observable<Route> {
    
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

  findByTitle(title: any): Observable<Route[]> {
    return this.http.get<Route[]>(`${baseUrl}?title=${title}`,{headers});
  }

}



