import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerService } from '../../../_service/banner.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.scss']
})
export class CreateBannerComponent implements OnInit {
  createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  file:any;
  live_image_url:any;
  id:number;
  uploaded_image:any;
  data:any;
  constructor(public _bannerService: BannerService, public fb: FormBuilder, private _gs: GlobalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      image: [this.file, Validators.required],
    })
    this.route.params.subscribe(params=>{
      this.id=params.id;
    })

    if(this.id){
      this.getEditData();
    }
  }

  imageUpload(event:any){
    let reader = new FileReader();
    this.file = event.target.files[0];
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.live_image_url = reader.result;
      };
    }
  }

  getEditData(){
    this._bannerService.getEditData(this.id).subscribe((res: any) => {
        this.data = res.data;
        this.edit();
    })
  }

  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      this.create_on_process = true;//on process
      this.isSubmited = false // Checking is form submited
      const fd = new FormData();
      const value = this.createForm.value;
      fd.append('id',value.id);
      fd.append('image',this.file);
      fd.append('title',value.title);
      fd.append('subtitle',value.subtitle);
      fd.append('url',value.url);
      this._bannerService.create(fd).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          this.createForm.reset();//reset for
          if(this.id){
            this.router.navigate(['/admin/banner/list']);
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

  edit(){
    const data = this.data;
    this.uploaded_image = data.image;
    this.createForm.patchValue({
      id:[this.id],
      title:[data.title],
      subtitle:[data.subtitle],
      image:[data.image],
      url:[data.url],
    })
  }

  cancelImage(){
    this.live_image_url=''
  }

}
