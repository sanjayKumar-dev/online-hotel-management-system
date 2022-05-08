import { Component, OnInit, ViewChild } from '@angular/core';
import {formatDate} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { RoomBookService } from 'src/app/service/room-book.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RoomBookDialogComponent } from '../room-book-dialog/room-book-dialog.component';

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

  constructor(private dialog: MatDialog, private api: RoomBookService) { }

  ngOnInit(): void {
    console.log(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.getRoomAvilabe();
  }

  currDate = {
    date: formatDate(new Date(), 'yyyy-MM-dd', 'en')
  }
  openDialog(){
    // this.dialog.open(RoomBookDialogComponent, {
    //   width: '30%',
    //   disableClose: true
    // }).afterClosed().subscribe();
    
  }

  getRoomAvilabe(){
    this.api.getAvilableRoom(new Date()).subscribe({
      next: (result)=>{
        console.log(result);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
        alert("Error while Featching Data!!");        
      }
    })
  }
  bookRoom(row: any){
    this.dialog.open(RoomBookDialogComponent, {
      width: '50%',
      data: row,
      disableClose: true
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
