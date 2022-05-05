import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bookingResponse } from '../models/booking-response';
import { guestRes } from '../models/guest-response';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingDetail = {
    bookingId: 0,
    roomId: '',
    guestId: 0,
    checkInDate: '',
    checkOutDate: '',
    checkInStatus: false,
    chekOutStatus: false,
    totalPrice: 0,
    paymentMode: "NA",
    paymentStatus: false,
    bookingStatus: "not booked"
  }

  private bookingUrl: string = 'http://localhost:8083/booking/add';
  private payUrl: string = 'http://localhost:8083/booking/payment';
  private guestUrl: string = 'http://localhost:8081/guest/add';
  constructor(private http: HttpClient) { }

  updateBacicDetail(data: any){
    this.bookingDetail.roomId = data.roomId;
    this.bookingDetail.checkInDate = data.checkInDate;
    this.bookingDetail.checkOutDate = data.checkOutDate;
    console.log(this.bookingDetail);
  }

  setGuestId(data: number){
    this.bookingDetail.guestId = data;
    console.log("In Set Guest Id : "+ this.bookingDetail.guestId);
    console.log("In Set Guest Id : "+ data);
  }
  addGuest(data:any){
    return this.http.post<guestRes>(this.guestUrl, data);
  }

  addBookingDetail(){
    console.log("Booking Detail in booking service befor booking ");
    console.log(this.bookingDetail);
    return this.http.post<bookingResponse>(this.bookingUrl, this.bookingDetail);
  }

  addPaymentDeatil(data: any){
    console.log("Guest Detail in booking service befor adding payment ");
    console.log(this.bookingDetail);
    return this.http.post<any>(this.payUrl, data);
  }
}
