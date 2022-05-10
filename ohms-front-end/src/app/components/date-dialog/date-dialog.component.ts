import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DatePipe} from "@angular/common"
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-dialog',
  templateUrl: './date-dialog.component.html',
  styleUrls: ['./date-dialog.component.css']
})
export class DateDialogComponent implements OnInit {

  dateForm!: FormGroup;
  minDate = new Date();

  constructor(private formBuilder: FormBuilder, 
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DateDialogComponent>) { }

  ngOnInit(): void {
    this.dateForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
    
  }

  
  confirm(){

    if(this.dateForm.valid){
      this.dialogRef.close(this.dateForm.value);
    } else {
      this.toastr.warning("Please Select the Both date", "Warning", {
        timeOut: 3000
      });
    }
    
    
  }


}
