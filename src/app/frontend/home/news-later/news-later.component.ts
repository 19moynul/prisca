import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../global';
import { FrontendService } from '../../../_service/frontend.service';

@Component({
  selector: 'ngx-news-later',
  templateUrl: './news-later.component.html',
  styleUrls: ['./news-later.component.scss']
})
export class NewsLaterComponent implements OnInit {

  light_theme:boolean=true;
  data;
  imagePath = GlobalVariable.IMAGE_PATH;
  success_message:string;
  error_message:string;
  form:FormGroup
  constructor(private _frontendService: FrontendService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email:['',Validators.required]
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
    this._frontendService.getNewsLetter().subscribe(
      (res: any) => {
        this.data = res.data
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  store(){
    this.success_message = '';
    this.error_message = '';
    if(!this.form.invalid){
      this._frontendService.storeEmail(this.form.value).subscribe((res: any) => {
        this.success_message = res.message;
        this.form.reset();
      },
        (error: any) => {
          if (error.error.email){
            this.error_message = error.error.email[0];
          }else{
            this.error_message = 'Sorry ! Failed to subscribe your email for news letter. please try agian'
          }
        }
      )
    }
  }

}
