import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string="http://localhost:7080/api/auth/signin"
  constructor(private http: HttpClient) {  }

  login(data: any){
    return this.http.post<Ilogin>(this.url, data);
  }
}