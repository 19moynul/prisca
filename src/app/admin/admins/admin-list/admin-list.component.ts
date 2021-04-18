import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { UserService } from '../../../_service/admin/user.service';
import { GlobalService } from '../../../_service/global.service';

@Component({
  selector: 'ngx-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  searchForm: FormGroup;
  all_data: any[];
  pagination: any[] = [5, 10, 15, 20, 25, 30, "See All"];
  data: any[];
  deleteID: any;
  editID: any;
  page: any = 1;
  limit: any = 10;
  totalLength: any;
  search_on_process: boolean = false;
  option: any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  //search arrays
  all_first_name: any[] = [];
  all_last_name: any[] = [];
  all_email: any[] = [];
  all_role: any[] = [];
  all_status: any[] = [];
  constructor(private fb: FormBuilder, private _userService: UserService, private router:Router, private _gs:GlobalService) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      sort: ['DESC'],
      first_name: [''],
      last_name: [''],
      email: [''],
      role: [1],
      status: ['']
    });
    this.getData();
  }

  getData() {
    var param_value = this.searchForm.value;
    var params = {
      limit: this.limit,
      page: this.page,
      first_name: param_value.first_name,
      last_name: param_value.last_name,
      email: param_value.email,
      role: param_value.role,
      status: param_value.status,
      sort: param_value.sort
    };
    this._userService.getAdmin(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.all_data = res.all_data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
    setTimeout(() => {
      this.Option('', '');
    }, 100)
  }



  search(event: any) {
    var field_name = event.target.name;
    const searchword = event.target.value;
    this.Option(searchword, field_name);
  }

  triggerSearch() {
    this.getData();
  }


  createAdmin(){
    this.router.navigate(['/admin/admins/create'])
  }



  //search data process section
  Option(searchword: any, field_name: any) {
    this.option = this.data.filter((res) => {
      if (field_name == 'first_name' || field_name == '') {
        this.all_first_name.length = 0;
        return (res.first_name.toLowerCase().match(searchword.toLowerCase()))
      }
      if (field_name == 'last_name' || field_name == '') {
        this.all_last_name.length = 0;
        return (res.last_name.toLowerCase().match(searchword.toLowerCase()))
      }
      if (field_name == 'email' || field_name == '') {
        this.all_email.length = 0;
        return (res.email.toLowerCase().match(searchword.toLowerCase()))
      }
      if (field_name == 'role' || field_name == '') {
        this.all_role.length = 0;
        return (res.role.toLowerCase().match(searchword.toLowerCase()))
      }
      if (field_name == 'status' || field_name == '') {
        this.all_status.length = 0;
        return (res.status.toLowerCase().match(searchword.toLowerCase()))
      }
    });
    this.uniqueValue(field_name);
  }

  uniqueValue(field_name: any) {
    const option = this.option;
    let length = option.length;
    for (let i = 0; i < length; i++) {
      if (!this.all_first_name.some(el => el.text === option[i].first_name) && (field_name == 'first_name' || field_name == '')) {
        var element = { text: option[i].first_name, value: option[i].first_name };
        this.all_first_name.push(element);
      }
      if (!this.all_last_name.some(el => el.text === option[i].last_name) && (field_name == 'last_name' || field_name == '')) {
        var element = { text: option[i].last_name, value: option[i].last_name };
        this.all_last_name.push(element);
      }
      if (!this.all_email.some(el => el.text === option[i].email) && (field_name == 'email' || field_name == '')) {
        var element = { text: option[i].email, value: option[i].email };
        this.all_email.push(element);
      }
      if (!this.all_role.some(el => el.text === option[i].role) && (field_name == 'role' || field_name == '')) {
        var element = { text: option[i].role, value: option[i].role };
        this.all_role.push(element);
      }
      if (!this.all_status.some(el => el.text === option[i].status) && (field_name == 'status' || field_name == '')) {
        var element = { text: option[i].status, value: option[i].status };
        this.all_status.push(element);
      }
    }
  }

  deactive(event:any,id:any){
    const status_value = event.originalTarget.checked;
    if(status_value==true){
      var status = 1
    } else if (status_value==false){
      var status = 0
    }else{
      var status = -1;
    }
    const value = { status:status,id:id }
    if(status !== -1){
      this._userService.changeStatus(value).subscribe(
        (res: any) => {
          this._gs.message('bottom-right', 'success', res.message);
          this.getData();
        }, (error: any) => {
          this._gs.message('bottom-right', 'danger', error.message);
          //process done
        }
      )
    }
  }

}
