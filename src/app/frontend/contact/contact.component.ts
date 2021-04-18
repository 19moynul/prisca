import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { GlobalVariable } from '../../global';
import { FrontendService } from '../../_service/frontend.service';
import { GlobalService } from '../../_service/global.service';

@Component({
  selector: 'ngx-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm:FormGroup;
  light_theme:boolean = true;
  contactData: any[];
  isSubmited:boolean=false;
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _frontendService: FrontendService, private fb: FormBuilder, private _gs: GlobalService, private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      username:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      message:['',Validators.required],
    })
    var theme = sessionStorage.getItem('theme')
    if (theme == 'light') {
      this.light_theme = true;
    } else if (theme == 'dark') {
      this.light_theme = false;
    }
    this.getData();
  }

  getData() {
    this._frontendService.getContact().subscribe(
      (res: any) => {
        this.contactData = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }


  contact(){
    this.isSubmited = true;
    if(!this.contactForm.invalid){
      this._frontendService.contact(this.contactForm.value).subscribe(
        (res:any)=>{},
        (error:any)=>{}
      )
    }else{
      this._gs.message('bottom-right', 'danger', 'Please fill all fields properly');
    }
  }

}
