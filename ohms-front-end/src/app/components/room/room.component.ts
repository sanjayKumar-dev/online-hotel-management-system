import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/service/room.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RoomDialogComponent } from '../room-dialog/room-dialog.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  displayedColumns: string[] = ['roomId', 'roomType', 'numberOfBeds', 'status', 'price','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private api: RoomService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllRoom();
  }

  openDialog(){
    this.dialog.open(RoomDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getAllRoom();
      }
      this.getAllRoom();
    });
  }

  getAllRoom(){
    this.api.getRoom().subscribe({
      next: (result)=>{
        this.dataSource= new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error("Error in featching Room data", "Error", {
          timeOut: 3000
        });
      }
    })
  }

  editRoom(row: any){
    this.dialog.open(RoomDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllRoom();
      }
    })
  }

  deleteRoom(id: string){
    this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you want to delete this Room?'
    }).afterClosed().subscribe(val=>{
      if(val === 'confirm'){
        this.api.deleteRoom(id).subscribe({
          next: (result)=>{
            this.getAllRoom();
            this.toastr.success("Deleted Successfully", "Success", {
              timeOut: 1000
            });
          },
          error: (err)=>{
            console.log(err);
            this.toastr.error("Error while Deleting", "Error", {
              timeOut: 2000
            })            
          }
        })
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

}
