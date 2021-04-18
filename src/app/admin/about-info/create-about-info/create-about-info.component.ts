import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { AboutusService } from '../../../_service/admin/aboutus.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-create-about-info',
  templateUrl: './create-about-info.component.html',
  styleUrls: ['./create-about-info.component.scss']
})
export class CreateAboutInfoComponent implements OnInit {
  editForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  image: any;
  live_image_url: any;
  uploaded_image: any;
  id: number
  data: any;
  imagePath= GlobalVariable.IMAGE_PATH
  constructor(public _aboutusService: AboutusService, public fb: FormBuilder, private _gs: GlobalService, private route:ActivatedRoute, private router:Router) { }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [this.id],
      image: [this.image],
      speaker_name: ['', Validators.required],
      speaker_position: ['', Validators.required],
      text: ['', Validators.required],
      title: ['', Validators.required]
    })
    this.route.params.subscribe(params => {
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
  cancelimage() {
    this.live_image_url = ''
  }

  getEditData() {
    this._aboutusService.getEditSpeechData(this.id).subscribe((res: any) => {
      this.data = res.data; this.edit();
    })
  }
  create() {
    this.isSubmited = true;
    if (!this.editForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.editForm.value;
       const fd = new FormData();
      fd.append('id',value.id);
      fd.append('image', this.image);
      fd.append('speaker_name', value.speaker_name);
      fd.append('speaker_position', value.speaker_position);
      fd.append('text', value.text);
      fd.append('title', value.title);
      this._aboutusService.updateSpeech(fd).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.create_on_process = false;//process done
          this.router.navigate(['/admin/aboutus/info/list']);
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
    this.uploaded_image = data.image;
     this.editForm.patchValue({
      id: [data.id],
      image: [data.image],
      speaker_name: [data.speaker_name],
      speaker_position: [data.speaker_position],
      text: [data.text],
      title: [data.title]
    })
  }


}
