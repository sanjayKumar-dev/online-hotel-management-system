import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomBookService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8083/booking";
  private guestUrl = "http://localhost:8081/guest";

  getAvilableRoom(date: any){
    return this.http.get<any>(this.url+"/getavilaberoom/"+date);
  }

  addGuest(data: any){
    return this.http.post<any>(this.guestUrl+"/add", data);
  }

  addBookingDetails(data: any){
    return this.http.post<any>(this.url+"/add", data);
  }

  finalBooking(data: any){
    return this.http.post<any>(this.url+"/payment", data);
  }
}
