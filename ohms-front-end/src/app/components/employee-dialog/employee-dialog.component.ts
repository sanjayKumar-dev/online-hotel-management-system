import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<EmployeeDialogComponent>) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      employeeId: 0,
      employeeName: ['', Validators.required],
      employeeAge: ['', Validators.required],
      employeeSalary: ['', Validators.required],
      department: ['', Validators.required],
      address: ['', Validators.required],
      employeePhoneNumber: ['', Validators.required]
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
            alert("Employee Added Successfully");
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },
          error: (err)=>{
            console.log(err);
            alert("Error While adding Employee!!");            
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
        alert("Updated Details");
        this.employeeForm.reset();
        this.dialogRef.close('update');
      },
      error: (err)=>{
        console.log(err);
        alert("Error while updating employee detail!!");        
      }
    })
  }

}
