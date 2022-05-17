import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if(localStorage.getItem('role') === 'ROLE_OWNER'){
      this.router.navigate(['owner/bookingoperation']);
    }
    else if(localStorage.getItem('role') === 'ROLE_MANAGER'){
      this.router.navigate(['manager/bookingoperation']);
    }
    else if(localStorage.getItem('role') === 'ROLE_RECEPTION'){
      this.router.navigate(['reception/bookingoperation']);
    }
    else{
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
            this.toastr.success("Login ","Login Successfully", {
              timeOut: 1000,
            });
            this.router.navigate(['owner/bookingoperation']);
            
          } else if(setRole === 'ROLE_MANAGER'){
            this.toastr.success("Login ","Login Successfully", {
              timeOut: 1000,
            });
            this.router.navigate(['manager/bookingoperation']);

          } else if(setRole === 'ROLE_RECEPTION'){
            this.toastr.success("Login ","Login Successfully", {
              timeOut: 1000,
            });
            this.router.navigate(['reception/bookingoperation']);
          }
        },
        error: (err)=>{
          console.log(err);
          this.toastr.error("Error While Login", "Error", {
            timeOut: 3000
          })

        }
      })      
    }else{
      this.toastr.error("Enter the value", "", {
        timeOut: 1000
      })
    }
  }
}
