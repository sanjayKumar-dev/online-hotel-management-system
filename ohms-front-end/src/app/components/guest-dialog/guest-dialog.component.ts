import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GuestCurdService } from 'src/app/service/guest-curd.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-guest-dialog',
  templateUrl: './guest-dialog.component.html',
  styleUrls: ['./guest-dialog.component.css']
})
export class GuestDialogComponent implements OnInit {

  guestForm !: FormGroup;
  actionBtn = 'Save';
  constructor(private formBuilder: FormBuilder, 
    private api: GuestCurdService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<GuestDialogComponent>) { }

  ngOnInit(): void {
    this.guestForm = this.formBuilder.group({
      guestId: 0,
      guestName: ['', Validators.required],
      guestAge: ['', Validators.required],
      guestContactNumber: ['', Validators.required],
      guestEmailId: ['', Validators.required],
      guestAddress: ['', Validators.required]
    });
    
    if(this.editData){
      this.actionBtn = 'Update';
      this.guestForm.controls['guestId'].setValue(this.editData.guestId);
      this.guestForm.controls['guestName'].setValue(this.editData.guestName);
      this.guestForm.controls['guestAge'].setValue(this.editData.guestAge);
      this.guestForm.controls['guestContactNumber'].setValue(this.editData.guestContactNumber);
      this.guestForm.controls['guestEmailId'].setValue(this.editData.guestEmailId);
      this.guestForm.controls['guestAddress'].setValue(this.editData.guestAddress);
    }
  }

  addGuest(){
    // console.log(this.guestForm.value);
    if(!this.editData){
      if(this.guestForm.valid){
        this.api.postGuest(this.guestForm.value).subscribe({
          next: (result)=>{
            console.log(result);
            alert("Guest Added Successfully");
            this.guestForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{
            console.log(err);
            alert("Error while Adding Guest");
          }
        })
      }
    } else {

      this.updateGuest();
    }
  }

  updateGuest(){
    console.log(this.guestForm.value);
    
    this.api.updateGuest(this.guestForm.value).subscribe({
      next: (result)=>{
        alert("Updated Guest Detail Successfully");
        this.guestForm.reset();
        this.dialogRef.close('update');
      },
      error: (err)=>{
        console.log(err);
        
        alert("Error While Updating Record!!");
      }
    })
  }

}
