import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8086/inventory";

  headerDict = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Headers': 'Content-Type',
		Authorization: `Bearer ${localStorage.getItem("token")}`
	};

  requestOptions = {
		headers: new HttpHeaders(this.headerDict)
	};

  postProduct(data: any){
    return this.http.post<any>(this.url+"/add", data, this.requestOptions);
  }

  getProduct(){
    return this.http.get<any>(this.url+"/get", this.requestOptions);
  }

  updateProduct(data: any){
    return this.http.put<any>(this.url+"/update", data, this.requestOptions);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(this.url+"/delete/"+id, this.requestOptions);
  }
}
