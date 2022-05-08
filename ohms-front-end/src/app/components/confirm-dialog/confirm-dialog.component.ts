import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public message = "";
  ngOnInit(): void {
    this.message = this.data;
  }

  reject(){
    this.message = "";
    this.dialogRef.close('cancel');
  }

  confirm(){
    this.message = "";
    this.dialogRef.close('confirm');
  }

}
