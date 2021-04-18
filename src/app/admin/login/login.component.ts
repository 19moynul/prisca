import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_service/auth.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login_on_process: boolean = false;
  isSubmited: boolean = false;
  isLoginSubmite: boolean = false;
  create_on_process: boolean = false;
  login_in_process: boolean = false;
  registrationForm: FormGroup;
  error_message: string;
  success_message: string;
  error_message_for_registration: string
  constructor(private _fb: FormBuilder, private _gs: GlobalService, private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  login() {
    // this.isSubmited = true;
    // if(!this.loginForm.invalid){
    //   this.isSubmited = false;
    //   this.login_on_process = true;
    //   this._loginservice.adminLogin(this.loginForm.value).subscribe((res:any)=>{
    //     if(res.success){
    //       this._gs.message('bottom-right', 'success', res.message);
    //       this.login_on_process = false;
    //     }else{
    //       this._gs.message('bottom-right', 'danger', res.message);
    //       this.login_on_process = false;
    //     }
    //     console.log(res);
    //   },
    //   (error:any)=>{
    //     this._gs.message('bottom-right', 'danger', 'Incorrect Username or Password');
    //     this.login_on_process = false;
    //   })
    // }else{
    //   this._gs.message('bottom-right', 'danger', 'Please fill all fields properly');
    // }
    this.error_message = '';
    this.isLoginSubmite = true;
    if (!this.loginForm.invalid) {
      const value = this.loginForm.value;
      this.isLoginSubmite = false; // Checking is form submited
      this.login_in_process = true;//on process;
      this.authservice.create(value).subscribe(
        (res: any) => {
          this.login_in_process = false;//process done
          if (res.success) {
            this.loginForm.reset();//reset for
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', res.data);
            this.router.navigate(['product'])
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
