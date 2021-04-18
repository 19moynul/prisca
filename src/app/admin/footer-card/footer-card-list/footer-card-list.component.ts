import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../global';
import { FooterService } from '../../../_service/admin/footer.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-footer-card-list',
  templateUrl: './footer-card-list.component.html',
  styleUrls: ['./footer-card-list.component.scss']
})
export class FooterCardListComponent implements OnInit {


  editForm: FormGroup
  all_data: any[];
  data: any[];
  pagination: any[] = [5, 10, 15, 20, 25, 30, "See All"];
  deleteID: any;
  editID: any;
  page: any = 1;
  limit: any = 10;
  totalLength: any;
  search_on_process: boolean = false;
  option: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  isSubmited: boolean;
  create_on_process: boolean = false;
  constructor(public _footerSevice: FooterService, public fb: FormBuilder, private _gs: GlobalService,) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: ['', Validators.required],
      icon: ['', Validators.required],
      title: ['', Validators.required]
    })
    this.getData();
  }

  getData() {
    var params = {
      limit: this.limit,
      page: this.page,
      sort: 'DESC'
    };
    this._footerSevice.getData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.all_data = res.all_data;
      console.log(res);
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
  }

  edit(id: any) {
    this.editID = id;
    const editData = this.data.find((x) => x.id === id);
    this.editForm.patchValue({
      id:editData.id,
      icon: editData.icon,
      title: editData.title
    })
  }


  update() {
    this.isSubmited = true;
    if (!this.editForm.invalid) {
      this.create_on_process = true;//on process;
      this.isSubmited = false; // Checking is form submited
      const value = this.editForm.value; this._footerSevice.create(value).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.editID = 0;
          this.getData();
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

  cancel() {
    this.editID = 0;
  }

  refresh() {
    this.search_on_process = true
    this.getData();
  }

}

