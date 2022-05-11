import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RoomBookService } from 'src/app/service/room-book.service';

@Component({
  selector: 'app-booking-report',
  templateUrl: './booking-report.component.html',
  styleUrls: ['./booking-report.component.css']
})
export class BookingReportComponent implements OnInit {

  displayedColumns: string[] = ['bookingId', 'roomId', 'guestId', 'checkInDate', 'checkOutDate','checkInStatus','chekOutStatus', 'totalPrice', 'bookingStatus'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private api: RoomBookService,
    private toastr: ToastrService) {   }

  ngOnInit(): void {
    this.getAllBooking();
  }

  getAllBooking(){
    this.api.getAllBooking().subscribe({
      next: (result)=>{
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error("Error While Fetching Booking data")
        
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
