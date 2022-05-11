import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { NEVER } from 'rxjs';
import { RoomBookService } from 'src/app/service/room-book.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-room-book-dialog',
  templateUrl: './room-book-dialog.component.html',
  styleUrls: ['./room-book-dialog.component.css']
})
export class RoomBookDialogComponent implements OnInit {

  guestForm!: FormGroup;
  bookingForm!: FormGroup;
  paymentForm!: FormGroup;

  minDate = Date();

  price = '';
  constructor(private formBuilder: FormBuilder,
    private api: RoomBookService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<RoomBookDialogComponent>,
    private toastr: ToastrService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.guestForm = this.formBuilder.group({
      // guestId: 0,
      // guestName: ['', Validators.required],
      // guestAge: ['', Validators.required],
      // guestContactNumber: ['', Validators.required],
      // guestEmailId: ['', Validators.required],
      // guestAddress: ['', Validators.required]
      guestId: 0,
      guestName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern("^[a-zA-Z -']+")]],
      guestAge: ['', [Validators.required, Validators.min(18), Validators.max(90)]],
      guestContactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]],
      guestEmailId: ['', [Validators.required, Validators.email]],
      guestAddress: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.bookingForm = this.formBuilder.group({
      bookingId: 0,
      roomId: ['', Validators.required],
      guestId: 0,//['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      checkInStatus: false,
      chekOutStatus: false,
      totalPrice: 0,
      paymentMode: "NA",
      paymentStatus: false,
      bookingStatus: "not booked"
    });

    this.paymentForm = this.formBuilder.group({
      paymentMode: ['', [Validators.required, Validators.minLength(3)]],
      paymentStatus: ['', Validators.required],
      bookingID: ['', Validators.required]
    });

    this.bookingForm.controls['roomId'].setValue(this.editData.roomId);
    this.bookingForm.controls['checkInDate'].setValue(this.editData.date.checkInDate);
    this.bookingForm.controls['checkOutDate'].setValue(this.editData.date.checkOutDate);
  }

  addGuest(){
    if(this.guestForm.valid){
      console.log(this.guestForm.value);
      this.api.addGuest(this.guestForm.value).subscribe({
        next: (result)=>{
          this.bookingForm.controls['guestId'].setValue(result.guestId);
          this.toastr.success("Guest Added", "",{
            timeOut: 1000
          });
        },
        error: (err)=>{
          console.log(err);
          this.toastr.error("Error in adding Guest", "", {
            timeOut: 2000
          });
        }
      })
    }

  }

  addBookingDetails(){
    if(this.bookingForm.valid){
      console.log(this.bookingForm.value);

      this.api.addBookingDetails(this.bookingForm.value).subscribe({
        next: (result)=>{
          this.paymentForm.controls['bookingID'].setValue(result.bookingId);
          this.bookingForm.controls['totalPrice'].setValue(result.price);
          this.price = result.price
          this.toastr.success("Added the Booking Details", "Success", {
            timeOut: 2000
          });
        },
        error: (err)=>{
          console.log(err);
          this.toastr.error("Error in Adding Booking Details", "Error", {
            timeOut: 2000
          });
        }
      });
    }
  }

  finalBooking(){
    if(this.paymentForm.valid){
      console.log(this.paymentForm.value);

      this.api.finalBooking(this.paymentForm.value).subscribe({
        next: (result)=>{
          console.log(result);
          this.toastr.success("Booking Confirm", "Success", {
            disableTimeOut: true
          });
        },
        error: (err)=>{
          console.log(err);
          this.toastr.error("Error in Final Booking", "", {
            timeOut: 2000
          });
        }
      })
    }
  }

  resetData(){
    this.guestForm.reset();
    this.bookingForm.reset();
    this.paymentForm.reset();
  }

  printreceipt(){
    console.log(this.bookingForm.controls['bookingId'].value);    
  }
}
