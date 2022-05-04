import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.bookingDetail.checkInDate = '';
    this.bookingDetail.checkOutDate = '';
    this.bookingDetail.roomId = '';
  }

  bookingDetail ={
    checkInDate: '',
    checkOutDate: '',
    roomId: ''
  }

  bookingToggle = false;
  guestToggle = true;
  paymentToggle = true;
  statusToggle = true;

  guest ={
    guestId: '',
    guestName: '',
    guestAge: '',
    guestContactNumber: '',
    guestEmailId: '',
    guestAddress: ''
  }

  message = "This is Simple message"
  bookingNext(){
    this.bookingService.updateBacicDetail(this.bookingDetail);
    this.bookingToggle = true;
    this.guestToggle = false;
  }

  guestPrev(){
    this.bookingToggle = false;
    this.guestToggle = true;
  }

  guestNext(){
    this.guestToggle = true;
    this.paymentToggle = false;
  }

  paymentPrev(){
    this.guestToggle = false;
    this.paymentToggle = true;
  }

  paymentNext(){
    this.paymentToggle = true;
    this.statusToggle = false;
  }

  rest(){

  }

}
