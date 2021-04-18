import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../../../global';
import { HomeBannerService } from '../../../_service/admin/home-banner.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-home-banner-list',
  templateUrl: './home-banner-list.component.html',
  styleUrls: ['./home-banner-list.component.scss']
})
export class HomeBannerListComponent implements OnInit {

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
  imagePath = GlobalVariable.IMAGE_PATH;
  image:any;
  constructor(private fb: FormBuilder, private home_banner_service:HomeBannerService, private _gs:GlobalService) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id:['',Validators.required],
      image: ['', Validators.required]
    })
    this.getData();
  }

  getData() {
    var params = {
      limit: this.limit,
      page: this.page,
      sort:'DESC'
    };
    this.home_banner_service.getData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.all_data = res.all_data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
  }

  edit(id: any) {
    this.editID = id;
    const editData = this.data.find((x) => x.id === id);
    this.editForm.patchValue({
      id:[id],
      image: [editData.image]
    })
  }


  imageUpload(event: any) {
    this.image = event.target.files[0];
    console.log(this.image)
  }

  update(){
    if (!this.editForm.invalid) {
      const fd = new FormData();
      const editData = this.editForm.value;
      fd.append('image', this.image);
      fd.append('id', editData.id);
      this.home_banner_service.create(fd).subscribe(
        (res: any) => {
          this.cancel();
          this._gs.message('bottom-right', 'success', res.message);
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
