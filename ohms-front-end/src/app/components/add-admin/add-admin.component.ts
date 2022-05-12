import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm!: FormGroup;


  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddAdminComponent>,
    private toastr: ToastrService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.addAdminForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      roles: [],
      password: ['', Validators.required]
    });
  }


  finalForm = {

  }

  private url = "http://localhost:7080/api/auth/signup";
  addAdmin(){
    const finalForm = {
      username: this.addAdminForm.value.username,
      email: this.addAdminForm.value.email,
      roles: [this.addAdminForm.value.roles],
      password: this.addAdminForm.value.password
    }

    console.log(finalForm);
    
    this.http.post<any>(this.url, finalForm).subscribe({
      next: (res)=>{
        this.toastr.success("Added User Successfully");
      },
      error: (err)=>{
        this.toastr.error("Error while adding")
      }
    })
  }

}
