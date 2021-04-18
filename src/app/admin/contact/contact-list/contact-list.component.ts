import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { ContactService } from '../../../_service/admin/contact.service';

@Component({
  selector: 'ngx-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  searchForm: FormGroup;
  all_data: any[];
  data: any[];
  deleteID: any;
  editID: any;
  page: any = 1;
  limit: any = 10;
  totalLength: any;
  search_on_process: boolean = false;
  option: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _contactservice:ContactService, private router:Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    var params = {
      limit: this.limit,
      page: this.page,
      sort: 'ASC'
    };
    this._contactservice.getData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.all_data = res.all_data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
  }

  edit(id){
    this.router.navigate(['/admin/contact/edit',id])
  }

}
