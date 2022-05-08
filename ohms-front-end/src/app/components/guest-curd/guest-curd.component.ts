import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GuestCurdService } from 'src/app/service/guest-curd.service';
import { GuestDialogComponent } from '../guest-dialog/guest-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-guest-curd',
  templateUrl: './guest-curd.component.html',
  styleUrls: ['./guest-curd.component.css']
})
export class GuestCurdComponent implements OnInit {

  //
  displayedColumns: string[] = ['guestId', 'guestName', 'guestAge', 'guestContactNumber', 'guestEmailId', 'guestAddress', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, 
    private api: GuestCurdService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllGuestDeatails();
  }

  // For Opening Dialog Box
  openDialog(){
    this.dialog.open(GuestDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'sava'){
        this.getAllGuestDeatails();
      }
      this.getAllGuestDeatails();
    });
  }

  getAllGuestDeatails(){
    this.api.getGuest().subscribe({
      next: (result)=>{
        console.log(result);
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        this.toastr.error("Error in while featching Guest data", "Error", {
          timeOut: 3000
        });
      }
    })
  }

  editGuest(row: any){
    this.dialog.open(GuestDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllGuestDeatails();
      }
    })
  }

  deleteGuest(id: number){

    this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you Want to Delete Guest Detail?'
    }).afterClosed().subscribe(val=>{
      if(val === 'confirm'){

        this.api.deleteGuest(id).subscribe({
          next: (result)=>{
            this.getAllGuestDeatails();
            this.toastr.success("Deleted Successfully", "Success", {
              timeOut: 1000
            });
          },
          error: ()=>{
            this.toastr.error("Error While Deleting", "Error", {
              timeOut: 2000
            });
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
