import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeBannerService } from '../../../_service/admin/home-banner.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-create-home-banner',
  templateUrl: './create-home-banner.component.html',
  styleUrls: ['./create-home-banner.component.scss']
})
export class CreateHomeBannerComponent implements OnInit {

  @Output() refreshList: EventEmitter<any> = new EventEmitter<any>(); createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  image:any;
  live_image_url:any;
  constructor(public _home_bannerService: HomeBannerService, public fb: FormBuilder, private _gs: GlobalService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      image: [this.image]
    })
  }

  imageUpload(event: any) {
    this.image = event.target.files[0];
    console.log(this.image)
  }

  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.createForm.value;
      const fd = new FormData();
      fd.append('image', this.image);
      this._home_bannerService.create(fd).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          this.createForm.reset();//reset for
          this.refreshList.emit();
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

}
