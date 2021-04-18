import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { AboutusService } from '../../../_service/admin/aboutus.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-aboutus-banner-edit',
  templateUrl: './aboutus-banner-edit.component.html',
  styleUrls: ['./aboutus-banner-edit.component.scss']
})
export class AboutusBannerEditComponent implements OnInit {
  createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  image: any;
  live_image_url: any;
  uploaded_image: any;
  id:number;
  data:any;
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(public _aboutus_service: AboutusService, public fb: FormBuilder, private _gs: GlobalService, private route:ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      id: ['',Validators.required],
      image: [this.image],
      text: ['', Validators.required],
      title: ['', Validators.required]
    })
    this.route.params.subscribe(params=>{
      this.id = params.id
    })
    this.getEditData();
  }


  imageUpload(event: any) {
    let reader = new FileReader();
    this.image = event.target.files[0];
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.live_image_url = reader.result;
      };
    }
  }
  cance() {
    this.live_image_url = '';
  }


  getEditData() {
    this._aboutus_service.getEditData(this.id).subscribe((res: any) => {
      this.data = res.data;
      this.edit(res.data);
      console.log(res);
    })
    setTimeout(()=>{
    },10)
  }

  edit(data: any) {
    this.uploaded_image=data.image;
    this.createForm.patchValue({
      id:[data.id],
      image: [data.image],
      text: [data.text],
      title: [data.title]
    })
  }

  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.createForm.value; const fd = new FormData(); fd.append('id', value.id);
      fd.append('id', value.id);
      fd.append('image', this.image);
      fd.append('text', value.text);
      fd.append('title', value.title);
      this._aboutus_service.create(fd).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          this.router.navigate(['/admin/aboutus/banner/list']);
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
