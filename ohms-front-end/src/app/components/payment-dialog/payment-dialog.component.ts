import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomBookService } from 'src/app/service/room-book.service';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  guestName = "";
  guestAge = 0;
  address = "";
  checkInDate !: Date;
  checkOutDate = new Date().toDateString();
  roomId = "";
  paymentMode = "";
  totalPrice = '';
  gusetId!: number;
  email = "";
  contact = "";

  constructor(private api: RoomBookService,
    @Inject(MAT_DIALOG_DATA) public editDta: any) { }

  ngOnInit(): void {
    this.api.getBookingById(this.editDta).subscribe({
      next: (res)=>{
        this.checkInDate = res.checkInDate;
        this.checkOutDate = res.checkOutDate;
        this.roomId = res.roomId;
        this.paymentMode = res.paymentMode;
        this.gusetId = res.guestId;
        this.totalPrice = res.totalPrice;
        this.api.getGuestById(res.guestId).subscribe({
          next: (res)=>{
            this.guestName = res.guestName;
            this.guestAge = res.guestAge;
            this.address = res.guestAddress;
            this.email = res.guestEmailId;
            this.contact = res.guestContactNumber;
          }, 
          error : (err)=>{
            console.log(err);
          }
        });
      }, 
      error: (err)=>{
        console.log(err);
      }
    });

    

  }

}
