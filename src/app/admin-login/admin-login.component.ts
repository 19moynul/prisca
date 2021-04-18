import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../_service/admin/login.service';
import { AuthService } from '../_service/auth.service';
import { GlobalService } from '../_service/global.service';

@Component({
  selector: 'ngx-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  loginForm:FormGroup;
  isSubmited: boolean = false;
  isLoginSubmite: boolean = false;
  create_on_process: boolean = false;
  login_in_process: boolean = false;
  registrationForm: FormGroup;
  error_message: string;
  success_message: string;
  error_message_for_registration: string
  constructor(private _fb:FormBuilder,private _gs:GlobalService,private router:Router,private authservice:AuthService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }


  login(){
    this.error_message = '';
    this.isLoginSubmite = true;
    if (!this.loginForm.invalid) {
      const value = this.loginForm.value;
      console.log(value);
      this.isLoginSubmite = false; // Checking is form submited
      this.login_in_process = true;//on process;
      this.authservice.adminLogin(value).subscribe(
        (res: any) => {
          this.login_in_process = false;//process done
          if (res.success) {
            this.loginForm.reset();//reset for
            localStorage.setItem('admin-token', res.token);
            localStorage.setItem('admin-data', JSON.stringify(res.data));
            this.router.navigate(['admin'])
          } else if (!res.success) {
            this.error_message = res.message;
            this.error_message
          }
        }, (error: any) => {
          console.log(error);
          if (error.error.errors.email) {
            this.error_message = error.error.errors.email[0]
          } else {
            this.error_message = error.message
          }
          this.login_in_process = false;
          //process done
        }
      )
    }
  }

}
