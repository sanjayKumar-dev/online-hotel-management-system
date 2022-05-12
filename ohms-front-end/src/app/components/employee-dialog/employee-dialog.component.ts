import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {

  employeeForm !: FormGroup;
  actionBtn = 'Sava';

  constructor(private formBuilder: FormBuilder,
    private api: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeId: 0,
      employeeName: ['', [Validators.required,  Validators.minLength(3), Validators.maxLength(20),Validators.pattern("^[a-zA-Z -']+")]],
      employeeAge: ['', [Validators.required, Validators.min(18), Validators.max(90)]],
      employeeSalary: ['', [Validators.required, Validators.min(5000)]],
      department: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]],
      employeePhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10)]]
    });

    if(this.editData){
      this.actionBtn = 'Update';
      this.employeeForm.controls['employeeId'].setValue(this.editData.employeeId);
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeForm.controls['employeeAge'].setValue(this.editData.employeeAge);
      this.employeeForm.controls['employeeSalary'].setValue(this.editData.employeeSalary);
      this.employeeForm.controls['department'].setValue(this.editData.department);
      this.employeeForm.controls['address'].setValue(this.editData.address);
      this.employeeForm.controls['employeePhoneNumber'].setValue(this.editData.employeePhoneNumber);

    }
  }

  addEmployee(){
    if(!this.editData){
      if(this.employeeForm.valid){
        this.api.postEmployee(this.employeeForm.value).subscribe({
          next: (result)=>{
            this.toastr.success("Employee Added Successfully", "Sucess", {
              timeOut: 1000
            });
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            console.log(err);
            this.toastr.error("Error while Adding Employee", "Error", {
              timeOut: 2000
            });
          }
        })
      }
    }else {
      this.updateEmployee();
    }
  }

  updateEmployee(){
    this.api.updateEmployee(this.employeeForm.value).subscribe({
      next: (result)=>{
        this.toastr.success("Employee Detail Updated Successfully", "Sucess", {
          timeOut: 1000
        });
        this.employeeForm.reset();
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
