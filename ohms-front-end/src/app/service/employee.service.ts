import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8084/employee";

  postEmployee(data: any){
    return this.http.post<any>(this.url+"/add", data);
  }

  getEmployee(){
    return this.http.get<any>(this.url+"/get");
  }

  updateEmployee(data: any){
    return this.http.put<any>(this.url+"/update", data);
  }

  deleteEmployee(id: number){
    return this.http.delete<any>(this.url+"/delete/"+id);
  }
}
