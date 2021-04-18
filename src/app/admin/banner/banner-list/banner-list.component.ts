import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalVariable } from '../../../global';
import { SearchService } from '../../../_service/admin/search.service';
import { BannerService } from '../../../_service/banner.service';

@Component({
  selector: 'ngx-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.scss']
})
export class BannerListComponent implements OnInit {

  @Output() productEdit: EventEmitter<any> = new EventEmitter<any>(); searchForm: FormGroup;
  all_data: any[];
  data: any[];
  pagination: any[] = [5, 10, 15, 20, 25, 30, "See All"];
  deleteID: any;
  editID: any;
  page: any = 1;
  limit: any = 10;
  totalLength: any;
  search_on_process: boolean = false;
  //search arrays all_id:any[] = [];
  all_title: any[] = [];
  all_subtitle: any[] = [];
  all_image: any[] = [];
  all_url: any[] = [];
  option:any[];
  imagePath = GlobalVariable.IMAGE_PATH;
  constructor(private _fb:FormBuilder , private _bannerService: BannerService , private _searchService:SearchService, private router:Router){}
  ngOnInit(): void {
   this.getData();
  }

  getData() {
    console.log('searching')
    var params = {
      limit: 10,
      page: 1,
      sort:'ASC'
    };
    this._bannerService.getData(params).subscribe((res: any) => {
      this.data = res.data.data;
      this.all_data = res.data.data;
      this.totalLength = res.data.total;
      this.page = res.data.current_page;
      this.search_on_process = false
    });
    // this._searchService.searchProcess()
  }


  edit(id: any) {
    this.router.navigate(['/admin/banner/edit',id]); //emit value in product-manage component
  }





  // openWindow(contentTemplate) {
  //   this.windowService.open(
  //     contentTemplate,
  //     {
  //       title: 'Window content from template',
  //       context: {
  //         text: 'some text to pass into template',
  //       },
  //     },
  //   );
  // }


  refresh() {
    this.search_on_process = true
    this.getData();
  }


}
