import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8084/employee";
  private departmentUrl = "http://localhost:8084/department/get"

  headerDict = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Headers': 'Content-Type',
		Authorization: `Bearer ${localStorage.getItem("token")}`
	};

  requestOptions = {
		headers: new HttpHeaders(this.headerDict)
	};

  postEmployee(data: any){
    return this.http.post<any>(this.url+"/add", data, this.requestOptions);
  }

  getEmployee(){
    return this.http.get<any>(this.url+"/get", this.requestOptions);
  }

  updateEmployee(data: any){
    return this.http.put<any>(this.url+"/update", data, this.requestOptions);
  }

  deleteEmployee(id: number){
    return this.http.delete<any>(this.url+"/delete/"+id, this.requestOptions);
  }

  getDepartment(){
    return this.http.get<any>(this.departmentUrl, this.requestOptions);
    console.log("In servece");
    
  }
}
