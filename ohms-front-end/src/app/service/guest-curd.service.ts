import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestCurdService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8081/guest";
  postGuest(data: any){
    return this.http.post<any>(this.url+"/add", data);
  }

  getGuest(){
    return this.http.get<any>(this.url+"/get");
  }

  updateGuest(data: any){
    return this.http.put<any>(this.url+"/update", data);
  }

  deleteGuest(id: number){
    return this.http.delete<any>(this.url+"/delete/"+id);
  }
}
