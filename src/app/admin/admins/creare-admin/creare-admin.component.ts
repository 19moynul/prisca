import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../_service/admin/user.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-creare-admin',
  templateUrl: './creare-admin.component.html',
  styleUrls: ['./creare-admin.component.scss']
})
export class CreareAdminComponent implements OnInit {


  createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  id: number
  data: any;
  constructor(public _userService: UserService, public fb: FormBuilder, private _gs: GlobalService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      status:[1,Validators.required],
      role:[1,Validators.required]
    })
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    if (this.id) {
      this.getEditData();
    }
  }



  getEditData() {
    this._userService.getEditData(this.id).subscribe((res: any) => {
      this.data = res.data; this.edit();
    })
  }
  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      const value = this.createForm.value;
      this.isSubmited = false; // Checking is form submited
      if (value.password == value.confirm_password){
       this.create_on_process = true;//on process;
       this._userService.create(value).subscribe(
         (res: any) => {
           if(res.success){
             this._gs.message('bottom-right', 'success', res.message);
             this.create_on_process = false;//process done
             this.createForm.reset();//reset for
             this.createForm.patchValue({
               status: 1,
               role: 1
             })
             if (this.id) {
               this.router.navigate(['/admin/']);
             }
           }else if(!res.success){
             this._gs.message('bottom-right', 'danger', res.message);
           }
         }, (error: any) => {
           this._gs.message('bottom-right', 'danger', error.message);
           this.create_on_process = false;
           //process done
         }
       )
     }else{
        this._gs.message('bottom-right', 'danger', "Confirm password doesn't match");
     }
    } else {
      console.log(this.createForm.value);
      this._gs.message('bottom-right', 'danger', 'Please fill all fields properly');
    }
  }

  edit() {
    const data = this.data;
    this.createForm.patchValue({
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password
    })
  }


}
