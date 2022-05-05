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

  
  guestToggle = false;
  bookingToggle = true;
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

  guestResponse = {
    message: '',
    guestId: 0,
    guestEmailId: ''
  }

  bookingRes = {
    message: '',
    price: 0.0,
    bookingId: 0
  }

  paymentDetail ={
    paymentMode: '',
    paymentStatus: false,
    bookingID: 0
  }
  message = "Your Booking is Confirm";


  guestNext(){
    this.guestToggle = true;
    this.bookingToggle = false;
    console.log(this.guest);
    // To Add Guest Detail
    this.bookingService.addGuest(this.guest).subscribe(
      result=>{
        this.guestResponse = result;
        console.log(this.guestResponse);
        this.bookingService.setGuestId(this.guestResponse.guestId);        
      }
    );
    
  }

  bookingNext(){
    this.bookingService.updateBacicDetail(this.bookingDetail);
    this.bookingToggle = true;
    this.paymentToggle = false;

    this.bookingService.addBookingDetail().subscribe(
        result=>{
          this.bookingRes = result;
          console.log(this.bookingRes);
          this.paymentDetail.bookingID = this.bookingRes.bookingId;
        }
      );
  }

  bookingPrev(){
    this.bookingToggle = true;
    this.guestToggle = false;
  }

  

  paymentPrev(){
    this.bookingToggle = false;
    this.paymentToggle = true;
  }

  paymentNext(){
    this.paymentToggle = true;
    this.statusToggle = false;
    console.log(this.paymentDetail);

    this.bookingService.addPaymentDeatil(this.paymentDetail).subscribe(
      result=>{
        console.log(result);
        this.message = result;
      }
    );
  }

  rest(){

  }

}
