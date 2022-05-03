import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { guestRes } from '../models/guest-response';

@Injectable({
  providedIn: 'root'
})
export class AddGuestService {

  private url: string = 'http://localhost:8081/guest/add';
  constructor(private http: HttpClient, private router: Router) { }

  guestResponse = {
    message: '',
    guestId: 0,
    guestEmailId: ''
  }

  public finalMessage = "";
  addGuest(data: any){
    return this.http.post<guestRes>(this.url, data).subscribe(
      result=>{
        // console.log(result);
        this.guestResponse = result;
        // console.log(this.guestResponse.message);
        this.finalMessage = this.guestResponse.message + ", Guest Id : "+ this.guestResponse.guestId ;
        this.router.navigate(['owner/response'], { state: {mes: this.finalMessage} })
      }
    );
  }
}
