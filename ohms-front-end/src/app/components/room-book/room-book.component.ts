import { Component, OnInit, ViewChild } from '@angular/core';
import {formatDate} from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoomBookService } from 'src/app/service/room-book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoomBookDialogComponent } from '../room-book-dialog/room-book-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { DateDialogComponent } from '../date-dialog/date-dialog.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room-book',
  templateUrl: './room-book.component.html',
  styleUrls: ['./room-book.component.css']
})
export class RoomBookComponent implements OnInit {

  displayedColumns: string[] = ['roomId', 'roomType', 'numberOfBeds', 'status', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dateForm!: FormGroup;
  minDate = new Date();
  constructor(private dialog: MatDialog,
    private api: RoomBookService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.openDialog();

  }

  openDialog(){
    this.dialog.open(DateDialogComponent, {

    }).afterClosed().subscribe(val =>{
      this.getRoomAvilabe(val);
    });
  }

  dateForBooking ={
    checkInDate: Date,
    checkOutDate: Date
  }
  getRoomAvilabe(data: any){
    console.log(data);
    console.log(data.checkInDate);
    console.log(data.checkOutDate);
    
    
    
    this.dateForBooking.checkInDate = data.checkInDate;
    this.dateForBooking.checkOutDate = data.checkOutDate;
    this.api.getAvilableRoom(data.checkInDate, data.checkOutDate).subscribe({
      next: (result)=>{
        console.log(result);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error("Error While fetching data", "Error", {
          timeOut: 2000
        });
      }
    })
  }
  bookRoom(row: any){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      roomId: row,
      date: this.dateForBooking
    }
    this.dialog.open(RoomBookDialogComponent, dialogConfig)
    //   {
    //   width: '50%',
    //   data: row,
    //   disableClose: true
    // })
  }

  search(){

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
