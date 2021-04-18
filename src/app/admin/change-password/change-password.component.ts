import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../_service/admin/user.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form:FormGroup;
  isSubmited:boolean=false;
  in_progress:boolean=false;
  constructor(private fb:FormBuilder, private _gs:GlobalService, private userService:UserService) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      old_password:['',Validators.required],
      new_password:['',Validators.required],
      password_confirmation:['',Validators.required]
    })
  }

  changePassword(){
    this.isSubmited=true;
    if(!this.form.invalid){
      const value = this.form.value;
      this.isSubmited = false; // Checking is form submited
      this.in_progress = true;
      if (value.new_password == value.confirm_password) {
        this.userService.changePassword(value).subscribe(
          (res:any)=>{
            if(res.success){
              this._gs.message('bottom-right', 'success', res.message);

            }else{
              this._gs.message('bottom-right', 'danger', res.message);
            }
          },
          (error:any)=>{}
        )
      }else{
        this._gs.message('bottom-right', 'danger', "Confirm password doesn't match");
      }
    }else{
      this._gs.message('bottom-right', 'danger', "Confirm password doesn't match");
    }
  }

}
