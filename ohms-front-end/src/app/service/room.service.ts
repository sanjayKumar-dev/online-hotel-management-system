import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8082/room";

  addRoom(data: any){
    return this.http.post<any>(this.url+"/add", data);
  }

  getRoom(){
    return this.http.get<any>(this.url+"/get");
  }

  updateRoom(data: any){
    return this.http.put<any>(this.url+"/update", data);
  }

  deleteRoom(id: string){
    return this.http.delete<any>(this.url+"/delete/"+id);
  }
}
