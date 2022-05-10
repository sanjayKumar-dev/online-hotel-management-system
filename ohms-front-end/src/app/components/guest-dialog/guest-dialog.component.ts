import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GuestCurdService } from 'src/app/service/guest-curd.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { ToastrService } from 'ngx-toastr';

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
    private dialogRef: MatDialogRef<GuestDialogComponent>,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.guestForm = this.formBuilder.group({
      guestId: 0,
      guestName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern("^[a-zA-Z -']+")]],
      guestAge: ['', [Validators.required, Validators.min(18), Validators.max(90)]],
      guestContactNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]],
      guestEmailId: ['', [Validators.required, Validators.email]],
      guestAddress: ['', [Validators.required, Validators.minLength(5)]]
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
    if(!this.editData){
      if(this.guestForm.valid){
        this.api.postGuest(this.guestForm.value).subscribe({
          next: (result)=>{
            this.toastr.success("Guest Added Successfully", "Sucess", {
              timeOut: 1000
            });
            this.guestForm.reset();
            this.dialogRef.close('save');
          },
          error:(err)=>{
            console.log(err);
            this.toastr.error("Error while Adding Guest", "Error", {
              timeOut: 2000
            });
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
        this.toastr.success("Guest Detail Updated Successfully", "Sucess", {
          timeOut: 1000
        });
        this.guestForm.reset();
        this.dialogRef.close('update');
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error("Error while Updating Detail", "Error", {
          timeOut: 2000
        });
      }
    })
  }

}
