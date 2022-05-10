import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.css']
})
export class RoomDialogComponent implements OnInit {

  roomForm!: FormGroup;
  actionBtn = 'Sava';

  constructor(private formBuilder: FormBuilder,
    private api: RoomService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<RoomDialogComponent>,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      roomId: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      roomType: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20),Validators.pattern("^[a-zA-Z -']+")]],
      numberOfBeds: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      status: false,
      price: ['', [Validators.required, Validators.min(0)]]
    });
    if(this.editData){
      this.actionBtn = 'Update';
      this.roomForm.controls['roomId'].setValue(this.editData.roomId);
      this.roomForm.controls['roomType'].setValue(this.editData.roomType);
      this.roomForm.controls['numberOfBeds'].setValue(this.editData.numberOfBeds);
      this.roomForm.controls['status'].setValue(this.editData.status);
      this.roomForm.controls['price'].setValue(this.editData.price);
    }
  }

  addRoom(){
    if(!this.editData){
      if(this.roomForm.valid){
        this.api.addRoom(this.roomForm.value).subscribe({
          next: (result)=>{
            this.toastr.success("Room Added Successfully", "Sucess", {
              timeOut: 1000
            });
            this.roomForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            console.log(err);
            this.toastr.error("Error while adding Room", "Error", {
              timeOut: 2000
            });
          }
        });
      } else{
        this.toastr.warning("Kindly fill all details", "", {
          timeOut: 2000
        })
      }
    }else{
      this.updateRoom();
    }
  }

  updateRoom(){
    this.api.updateRoom(this.roomForm.value).subscribe({
      next: (result)=>{
        this.toastr.success("Room Detail Updated Successfully", "Sucess", {
          timeOut: 1000
        });
        this.roomForm.reset();
        this.dialogRef.close('update');
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error("Error while updating deatil", "Error", {
          timeOut: 2000
        });        
      }
    })
  }

}
