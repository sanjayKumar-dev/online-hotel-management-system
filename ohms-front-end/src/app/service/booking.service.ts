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
}
