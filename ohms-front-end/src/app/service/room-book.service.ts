import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomBookService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8083/booking";
  private guestUrl = "http://localhost:8081/guest";

  headerDict = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Headers': 'Content-Type',
		Authorization: `Bearer ${localStorage.getItem("token")}`
	};

  requestOptions = {
		headers: new HttpHeaders(this.headerDict)
	};

  getAvilableRoom(cid: any, cod: any){
    return this.http.get<any>(this.url+"/getavilaberoom/"+cid+"/"+cod, this.requestOptions);
  }

  addGuest(data: any){
    return this.http.post<any>(this.guestUrl+"/add", data, this.requestOptions);
  }

  addBookingDetails(data: any){
    return this.http.post<any>(this.url+"/add", data, this.requestOptions);
  }

  finalBooking(data: any){
    return this.http.post<any>(this.url+"/payment", data, this.requestOptions);
  }

  getAllBooking(){
    return this.http.get<any>(this.url+"/get", this.requestOptions);
  }

  checkIn(id: number){
    return this.http.get<any>(this.url+"/checkin/"+id, this.requestOptions);
  }

  checkOut(id: number){
    return this.http.get<any>(this.url+"/checkout/"+id, this.requestOptions);
  }

  cancelBooking(id: number){
    return this.http.get<any>(this.url+"/cancel/"+id, this.requestOptions);
  }

  getBookingById(id: number){
    return this.http.get<any>(this.url+"/get/"+id, this.requestOptions);
  }

  getGuestById(id: number){
    return this.http.get<any>(this.guestUrl+"/get/"+id, this.requestOptions);
  }
}
