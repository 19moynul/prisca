import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from '../../../_service/admin/social.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-edit-social',
  templateUrl: './edit-social.component.html',
  styleUrls: ['./edit-social.component.scss']
})
export class EditSocialComponent implements OnInit {

  createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  icon: number
  data: any;
  constructor(public socialService: SocialService,private route:ActivatedRoute, public fb: FormBuilder, private _gs: GlobalService, public router:Router) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      id: [''],
      icon: ['',Validators.required],
      link: ['', Validators.required]
    })
    this.route.params.subscribe(params => {
      this.icon = params.id;
    })
    this.getEditData();
  }



  getEditData() {
    this.socialService.getEditData(this.icon).subscribe((res: any) => {
      this.data = res.data; this.edit();
    })
  }
  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.createForm.value;
       this.socialService.create(value).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          this.createForm.reset();//reset for
          if (this.icon) {
            this.router.navigate(['/admin/social/list']);
          }
        }, (error: any) => {
          this._gs.message('bottom-right', 'danger', error.message);
          this.create_on_process = false;
          //process done
        }
      )
    } else {
      this._gs.message('bottom-right', 'danger', 'Please fill all fields properly');
    }
  }
  edit() {
    const data = this.data;
    this.createForm.patchValue({
      id: data.id,
      icon: data.icon,
      link: data.link
    })
  }

}
