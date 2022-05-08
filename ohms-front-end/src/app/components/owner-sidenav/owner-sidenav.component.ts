import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-owner-sidenav',
  templateUrl: './owner-sidenav.component.html',
  styleUrls: ['./owner-sidenav.component.css']
})
export class OwnerSidenavComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you want to logout?'
    }).afterClosed().subscribe(val=>{
      if(val === 'confirm'){
        localStorage.clear();
        this.router.navigate(['login']);
      }
    })

  }
}
