import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RoomBookService } from 'src/app/service/room-book.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-booking-operation',
  templateUrl: './booking-operation.component.html',
  styleUrls: ['./booking-operation.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BookingOperationComponent implements OnInit {

  displayedColumns: string[] = ['bookingId', 'roomId', 'guestId', 'checkInDate', 'checkOutDate','checkInStatus','chekOutStatus', 'bookingStatus','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private api: RoomBookService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllBooking();
  }

  openPaymentReceipt(row: any){
    this.dialog.open(PaymentDialogComponent, {
      width: '50%',
      data: row
    })

  }

  getAllBooking(){
    this.api.getAllBooking().subscribe({
      next: (result)=>{
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkIn(row: any){

    if(row.checkInStatus === false && row.bookingStatus === "Booked"){  
      this.dialog.open(ConfirmDialogComponent, {
        data: 'Are u Sure For Check-In?'
      }).afterClosed().subscribe(val=>{
        if(val === 'confirm'){
          this.api.checkIn(row.bookingId).subscribe({
            next: (result)=>{
              this.toastr.success("Check In successfull", "", {
                timeOut: 3000
              });
              this.getAllBooking();
            },
            error: (err)=>{
              console.log(err);
              this.toastr.error("Error in Check In", "", {
                timeOut: 3000
              });
            }
          })
        }
      })   
    }

    else{
      this.toastr.warning("Booking is not Confirm or Guest is already checked-in", "", {timeOut: 3000});
    }
  }

  checkOut(row: any){

    if(row.checkInStatus === true && row.chekOutStatus === false){
      this.dialog.open(ConfirmDialogComponent, {
        data: 'Are u Sure For Check-Out?'
      }).afterClosed().subscribe(val=>{
        if(val === 'confirm'){
          this.api.checkOut(row.bookingId).subscribe({
            next: (result)=>{
              this.toastr.success("Check Out successfull", "", {
                timeOut: 3000
              });
              this.getAllBooking();
            },
            error: (err)=>{
              console.log(err);
              this.toastr.error("Error in Check In", "", {
                timeOut: 3000
              });
            }
          })
        }
      })
    }
    else{
      this.toastr.warning("Guest is not checked-in or already checked-out", "", {timeOut: 3000});
    }

    
  }

  cancelBooking(row: any){

    if(row.checkInStatus === false && row.bookingStatus === 'Booked'){
      this.dialog.open(ConfirmDialogComponent, {
        data: 'Are u Sure For Cancelling this Booking?'
      }).afterClosed().subscribe(val=>{
        if(val === 'confirm'){
          this.api.cancelBooking(row.bookingId).subscribe({
            next: (result)=>{
              this.toastr.success("Canceled Booking");
              this.getAllBooking();
            },
            error: (err)=>{
              console.log(err);
              this.toastr.error("Error in cancelling ");        
            }
          })          
        }
      })
    }

    else{
      this.toastr.warning("Guest is checked-in or booking is not Confirm", "", {timeOut: 3000});
    }
  }

}
