import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-owner-sidenav',
  templateUrl: './owner-sidenav.component.html',
  styleUrls: ['./owner-sidenav.component.css']
})
export class OwnerSidenavComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logout(){
    this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you want to logout?'
    }).afterClosed().subscribe(val=>{
      if(val === 'confirm'){
        localStorage.clear();
        this.router.navigate(['login']);
        this.toastr.success("Logout Successfully", "Logout", {
          timeOut: 2000
        });
      }
    })

  }

  addAdmin(){
    console.log("Clicked Add Admin");
    this.dialog.open(AddAdminComponent, {
      width: '30%'
    })
    
  }
}
