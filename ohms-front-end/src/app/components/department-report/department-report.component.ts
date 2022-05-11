import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-department-report',
  templateUrl: './department-report.component.html',
  styleUrls: ['./department-report.component.css']
})
export class DepartmentReportComponent implements OnInit {
  displayedColumns: string[] = ['departmentName', 'nunmberOfEmployee', 'averageSalary'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDepaermentDetails();
  }

  getDepaermentDetails(){
    this.api.getDepartment().subscribe({
      next: (result)=>{
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error("Error in while featching Department data", "Error", {
          timeOut: 3000
        });

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
