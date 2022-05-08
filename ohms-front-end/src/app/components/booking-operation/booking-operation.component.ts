import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoomBookService } from 'src/app/service/room-book.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    private api: RoomBookService) { }

  ngOnInit(): void {
    this.getAllBooking();
  }
  openDialog(){

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

    if(row.checkInStatus === false && row.bookingStatus === 'Booked'){  
      this.dialog.open(ConfirmDialogComponent, {
        data: 'Are u Sure For Check-In?'
      }).afterClosed().subscribe(val=>{
        if(val === 'confirm'){
          this.api.checkIn(row.bookingId).subscribe({
            next: (result)=>{
              alert("Check In successfull");
              this.getAllBooking();
            },
            error: (err)=>{
              console.log(err);
              alert("Error in Check In!!");
            }
          })
        }
      })   
    }

    else{
      alert("Can't check-in when booking is not confirm !!");
    }
  }

  checkOut(row: any){

    if(row.checkInStatus === 'true'){
      this.dialog.open(ConfirmDialogComponent, {
        data: 'Are u Sure For Check-Out?'
      }).afterClosed().subscribe(val=>{
        if(val === 'confirm'){
          this.api.checkOut(row.bookingId).subscribe({
            next: (result)=>{
              alert("Check Out successfull");
              this.getAllBooking();
            },
            error: (err)=>{
              console.log(err);
              alert("Error in Check In!!");
            }
          })
        }
      })
    }
    else{
      alert("Can't check-Out when check-in status is false");
    }

    
  }

  cancelBooking(row: any){

    if(row.checkInStatus === 'false' && row.bookingStatus === 'Booked'){
      this.dialog.open(ConfirmDialogComponent, {
        data: 'Are u Sure For Cancelling this Booking?'
      }).afterClosed().subscribe(val=>{
        if(val === 'confirm'){
          this.api.cancelBooking(row.bookingId).subscribe({
            next: (result)=>{
              alert("Canceled Booking");
              this.getAllBooking();
            },
            error: (err)=>{
              console.log(err);
              alert("Error in cancelling !!");            
            }
          })          
        }
      })
    }

    else{
      alert("Can't cancel the booking when guest is checked-in!!")
    }
  }

}
