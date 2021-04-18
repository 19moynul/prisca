import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../../global';
import { ColorService } from '../../../../_service/admin/color.service';
import { GlobalService } from '../../../../_service/global.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  editForm: FormGroup
  data: any[];
  deleteID: any;
  editID: any;
  page: any = 1;
  limit: any = 500;
  totalLength: any;
  search_on_process: boolean = false;
  option: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
//search arrays
  constructor(private _colorService:ColorService,private fb:FormBuilder, private _gs:GlobalService) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: ['',Validators.required],
      color: ['', Validators.required]
    })
    this.getData();
  }

  getData() {
    var params = {
      limit: this.limit,
      page: this.page,
      sort: 'DESC'
    };
    this._colorService.getData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
  }

  edit(id: any) {
    this.editID = id;
    const editData = this.data.find((x) => x.id === id);
    this.editForm.patchValue({
      id: id,
      color: editData.color
    })
  }

  update() {
    if (!this.editForm.invalid) {
      const value = this.editForm.value;
      this._colorService.create(value).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.cancel();
          this.getData();
        }, (error: any) => {
          this._gs.message('bottom-right', 'danger', error.message);
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
