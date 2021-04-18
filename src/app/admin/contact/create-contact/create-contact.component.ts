import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { exit } from 'process';
import { ContactService } from '../../../_service/admin/contact.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  id: number
  data: any;
  constructor(public _contactService: ContactService, public fb: FormBuilder, private _gs: GlobalService , private route:ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      id: ['', Validators.required],
      icon: ['', Validators.required],
      information: ['', Validators.required],
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
    this._contactService.getEditData(this.id).subscribe((res: any) => {
      this.data = res.data;
      this.edit();
    })
  }
  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.createForm.value;
      console.log(value);

      this._contactService.create(value).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          if (this.id) {
            this.router.navigate(['/admin/contact/list']);
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
      information: data.information,
      title: data.title
    })

    console.log(this.createForm.value);
  }

}
