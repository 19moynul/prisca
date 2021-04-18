import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OtherService } from '../../../_service/admin/other.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-other-edit',
  templateUrl: './other-edit.component.html',
  styleUrls: ['./other-edit.component.scss']
})
export class OtherEditComponent implements OnInit {

  createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  id: number
  data: any;
  constructor(public _otherService: OtherService, public fb: FormBuilder, private _gs: GlobalService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      id: [''],
      text: [''],
      title: ['', Validators.required]
    })
    this.route.params.subscribe(params => {
      this.id = params.id;
    })
    if (this.id) {
      this.getEditData();
    }
  }



  getEditData() {
    this._otherService.getEditData(this.id).subscribe((res: any) => {
      this.data = res.data; this.edit();
    })
  }
  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.createForm.value; this._otherService.create(value).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          this.createForm.reset();//reset for
          if (this.id) {
            this.router.navigate(['/admin/others/list']);
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
      text: data.text,
      title: data.title
    })
  }
}
