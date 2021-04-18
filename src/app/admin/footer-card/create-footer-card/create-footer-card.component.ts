import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FooterService } from '../../../_service/admin/footer.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-create-footer-card',
  templateUrl: './create-footer-card.component.html',
  styleUrls: ['./create-footer-card.component.scss']
})
export class CreateFooterCardComponent implements OnInit {

  @Output() refreshList: EventEmitter<any> = new EventEmitter<any>();
  createForm: FormGroup;
  isSubmited: boolean;
  create_on_process: boolean = false;
  constructor(public _footerSevice: FooterService, public fb: FormBuilder, private _gs: GlobalService,) { }
  ngOnInit(): void {
    this.createForm = this.fb.group({
      icon: [''],
      title: ['', Validators.required]
    })
  }



  create() {
    this.isSubmited = true;
    if (!this.createForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.createForm.value; this._footerSevice.create(value).subscribe(
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
