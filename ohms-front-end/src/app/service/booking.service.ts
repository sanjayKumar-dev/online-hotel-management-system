import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingDetail = {
    bookingId: 0,
    roomId: '',
    guestId: '',
    checkInDate: '',
    checkOutDate: '',
    checkInStatus: false,
    chekOutStatus: false,
    totalPrice: 0,
    paymentMode: "NA",
    paymentStatus: false,
    bookingStatus: "not booked"
  }

  private url: string = 'http://localhost:8083/booking';
  constructor() { }

  updateBacicDetail(data: any){
    this.bookingDetail.roomId = data.roomId;
    this.bookingDetail.checkInDate = data.checkInDate;
    this.bookingDetail.checkOutDate = data.checkOutDate;
    console.log(this.bookingDetail);
  }
}
