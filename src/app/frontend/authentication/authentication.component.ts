import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../_service/admin/user.service';
import { AuthService } from '../../_service/auth.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'ngx-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  isloginForm:boolean=true; //false = rgistration form
  light_theme:boolean=true;
  isSubmited: boolean = false;
  isLoginSubmite:boolean = false;
  create_on_process: boolean = false;
  login_in_process: boolean = false;
  registrationForm:FormGroup;
  loginForm:FormGroup;
  error_message:string;
  success_message:string;
  error_message_for_registration:string
  constructor(private fb: FormBuilder, private _gs: GlobalService, private _userService:UserService, private router :Router, private authservice:AuthService) { }

  ngOnInit(): void {
    var theme = sessionStorage.getItem('theme')
    if(theme == 'light'){
      this.light_theme = true;
    }else if(theme == 'dark'){
      this.light_theme = false;
    }
    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      status: [1, Validators.required],
      role: [2, Validators.required]
    })
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }



  login(){
    this.error_message = '';
    this.isLoginSubmite = true;
    if(!this.loginForm.invalid){
      const value = this.loginForm.value;
      this.isLoginSubmite = false; // Checking is form submited
      this.login_in_process = true;//on process;
      this.authservice.create(value).subscribe(
        (res: any) => {
          this.login_in_process = false;//process done
          if (res.success) {
            this.loginForm.reset();//reset for
            localStorage.setItem('token',res.token);
            localStorage.setItem('user',res.data);
            this.router.navigate(['product'])
          } else if (!res.success) {
            this.error_message = res.message;
            this.error_message
          }
        }, (error: any) => {
          console.log(error);
          if(error.error.errors.email){
            this.error_message = error.error.errors.email[0]
          }else{
            this.error_message = error.message
          }
          this.login_in_process = false;
          //process done
        }
      )
    }
  }


  create() {
    this.isSubmited = true;
    if (!this.registrationForm.invalid) {
      const value = this.registrationForm.value;
      this.isSubmited = false; // Checking is form submited
      if (value.password == value.password_confirmation) {
        this.create_on_process = true;//on process;
        this._userService.create(value).subscribe(
          (res: any) => {
            if (res.success) {
              this._gs.message('bottom-right', 'success', res.message);
              this.create_on_process = false;//process done
              this.registrationForm.reset();//reset for
              this.registrationForm.patchValue({
                status: 1,
                role: 2
              })
            } else if (!res.success) {
              this.error_message_for_registration = res.message
            }
          }, (error: any) => {
            console.log(error);
            if (error.error.errors.email) {
              this.error_message_for_registration = error.error.errors.email[0]
            } else {
              this.error_message_for_registration = error.message
            }
            //process done
          }
        )
      } else {
        this.error_message_for_registration = "Confirm password doesn't match"
      }
    } else {
      this._gs.message('bottom-right', 'danger', 'Please fill all fields properly');
    }
  }



  goToregistration(){
    this.isloginForm = false;
  }
  goToLogin(){
    this.isloginForm = true;
  }

}
