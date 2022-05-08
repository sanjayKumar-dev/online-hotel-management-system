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
  constructor(private loginService: LoginService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if(localStorage.getItem('role') === 'ROLE_OWNER'){
      this.router.navigate(['owner']);
    }else{
      console.log(localStorage.getItem('role'));
      
    }
  }

  loginClick(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value).subscribe({
        next: (result)=>{
          const setRole = result.roles[0].toString();
          localStorage.setItem('role', setRole);
          localStorage.setItem('token', result.accessToken);
          localStorage.setItem('tokenType', result.tokenType);
          localStorage.setItem('username', result.username);
          localStorage.setItem('email', result.email);
          if(setRole === 'ROLE_OWNER'){
            this.router.navigate(['owner']);
          }
        },
        error: (err)=>{
          console.log(err);
          alert("Error While Login!!");          
        }
      })      
    }else{
      alert("Enter the value");
    }
  }
}
