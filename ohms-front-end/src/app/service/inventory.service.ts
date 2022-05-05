import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }

  private url = "http://localhost:8086/inventory";

  postProduct(data: any){
    return this.http.post<any>(this.url+"/add", data);
  }

  getProduct(){
    return this.http.get<any>(this.url+"/get");
  }

  updateProduct(data: any){
    return this.http.put<any>(this.url+"/update", data);
  }

  deleteProduct(id: number){
    return this.http.delete<any>(this.url+"/delete/"+id);
  }
}
