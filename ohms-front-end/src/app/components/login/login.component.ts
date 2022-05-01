import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginDisabled = false;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  logInUserData = {
		username: ``,
		password: ``
	};

  loginResponse ={
    id: '',
    username: '',
    email: '',
    roles: [
        ''
    ],
    accessToken: '',
    tokenType: ''
  }

  authenticateUser(date: any){
    // console.log(this.logInUserData.username);
    // console.log(this.logInUserData.password);
    console.log(this.logInUserData);
    this.loginService.login(this.logInUserData).subscribe(
      (result)=>{
        console.log(result);
        console.log(result.roles[0])
        if(result.roles[0]=="ROLE_USER"){
          this.router.navigate(['owner'])
        }
      },
      (error)=>{
        alert("User Name or Passowrd is not correcr");
        console.log(error);
      }
    )
  }

}
