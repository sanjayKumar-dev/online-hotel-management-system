import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-reception-sidenav',
  templateUrl: './reception-sidenav.component.html',
  styleUrls: ['./reception-sidenav.component.css']
})
export class ReceptionSidenavComponent implements OnInit {

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

}
