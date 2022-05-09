import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/employee.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ['employeeId', 'employeeName', 'employeeAge', 'employeeSalary', 'department','address','employeePhoneNumber','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
    private api: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  openDialog(){
    this.dialog.open(EmployeeDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllEmployee();
      }
      this.getAllEmployee();
    });
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe({
      next: (result)=>{
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error("Error in while featching Employee data", "Error", {
          timeOut: 3000
        });
      }
    })
  }

  editEmployee(row: any){
    this.dialog.open(EmployeeDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'update'){
        this.getAllEmployee();
      }
    })
  }

  deleteEmployee(id: number){

    this.dialog.open(ConfirmDialogComponent, {
      data: 'Do you Want to Delete Employee Detail?'
    }).afterClosed().subscribe(val=>{
      if(val === 'confirm'){

        this.api.deleteEmployee(id).subscribe({
          next: (result)=>{
            this.getAllEmployee();
            this.toastr.success("Deleted Successfully", "Success", {
              timeOut: 1000
            });
          },
          error: ()=>{
            this.toastr.error("Error While Deleting", "Error", {
              timeOut: 2000
            });
          }
        })

      }
    })

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
