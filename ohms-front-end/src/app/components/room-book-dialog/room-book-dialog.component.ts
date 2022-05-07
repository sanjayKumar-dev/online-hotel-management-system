import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomBookService } from 'src/app/service/room-book.service';

@Component({
  selector: 'app-room-book-dialog',
  templateUrl: './room-book-dialog.component.html',
  styleUrls: ['./room-book-dialog.component.css']
})
export class RoomBookDialogComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  guestForm!: FormGroup;
  bookingForm!: FormGroup;
  paymentForm!: FormGroup;
  

  constructor(private formBuilder: FormBuilder,
    private api: RoomBookService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<RoomBookDialogComponent>) { }

  ngOnInit(): void {
    this.guestForm = this.formBuilder.group({
      guestId: 0,
      guestName: ['', Validators.required],
      guestAge: ['', Validators.required],
      guestContactNumber: ['', Validators.required],
      guestEmailId: ['', Validators.required],
      guestAddress: ['', Validators.required]
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
      paymentMode: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      bookingID: ['', Validators.required]
    });

    this.bookingForm.controls['roomId'].setValue(this.editData.roomId);
    // console.log(this.guestForm.value);
    // console.log(this.bookingForm.value);
    
  }

  addGuest(){
    if(this.guestForm.valid){
      console.log(this.guestForm.value);
      this.api.addGuest(this.guestForm.value).subscribe({
        next: (result)=>{
          this.bookingForm.controls['guestId'].setValue(result.guestId);
        },
        error: (err)=>{
          console.log(err);        
          alert("Error While adding Guest!!");
        }
      })
    }
    
  }

  addBookingDetails(){
    // console.log(this.bookingForm.value);
    if(this.bookingForm.valid){
      this.api.addBookingDetails(this.bookingForm.value).subscribe({
        next: (result)=>{
          this.paymentForm.controls['bookingID'].setValue(result.bookingId);
          this.bookingForm.controls['totalPrice'].setValue(result.price);
          alert("Added the Booking Details");
          // console.log(this.bookingForm.value);          
          // console.log(this.paymentForm.value);
          
        },
        error: (err)=>{
          console.log(err);
          alert("Error while add booking details");          
        }
      })
    }    
  }

  finalBooking(){
    if(this.paymentForm.valid){
      console.log(this.paymentForm.value);
      
      this.api.finalBooking(this.paymentForm.value).subscribe({
        next: (result)=>{
          console.log(result);
          alert("Booking Confirm");          
        },
        error: (err)=>{
          console.log(err);
          alert("Error in Final Booking");          
        }
      })
    }
  }

  resetData(){
    this.guestForm.reset();
    this.bookingForm.reset();
    this.paymentForm.reset();
  }

}
