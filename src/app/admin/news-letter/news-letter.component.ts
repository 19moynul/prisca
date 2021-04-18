import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsLetterService } from '../../_service/admin/news-letter.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'ngx-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.scss']
})
export class NewsLetterComponent implements OnInit {

  editForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  id:number = 1;
  data: any;
  constructor(public _newsletterservice: NewsLetterService, public fb: FormBuilder, private _gs: GlobalService , private route:ActivatedRoute , private router:Router) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [''],
      description: [''],
      header: [''],
      privacy_policy: [''],
      short_description: [''],
      title: ['']
    })
    this.getEditData();
  }



  getEditData() {
    this._newsletterservice.getEditData(this.id).subscribe((res: any) => {
      this.data = res.data;
      this.edit();
    })
  }
  update() {
    this.isSubmited = true;
    if (!this.editForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.editForm.value; this._newsletterservice.create(value).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          this.getEditData();
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
    this.editForm.patchValue({
      id: data.id,
      description: data.description,
      header: data.header,
      privacy_policy: data.privacy_policy,
      short_description: data.short_description,
      title: data.title
    })
  }

}
