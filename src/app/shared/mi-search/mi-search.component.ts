import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-mi-search',
  templateUrl: './mi-search.component.html',
  styleUrls: ['./mi-search.component.scss']
})
export class MiSearchComponent implements OnInit {
  data:any[];
  option:any[];
  all_title:any[];
  all_subtitle:any[];
  all_url:any[];
  searchForm:FormGroup;
  search_on_process:boolean=false;
  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this._fb.group({
      sort: ['DESC'],
      title: [''],
      subtitle: [''],
      url: ['']
    });
  }

  search(event: any) {
    var field_name = event.target.name;
    const searchword = event.target.value;
    this.Option(searchword, field_name);

  }

  Option(searchword: any, field_name: any) {
    this.option = this.data.filter((res) => {
      if (field_name == 'title' || field_name == '') {
        this.all_title.length = 0;
        return (res.title.toLowerCase().match(searchword.toLowerCase()))
      }
      if (field_name == 'subtitle' || field_name == '') {
        this.all_subtitle.length = 0;
        return (res.subtitle.toLowerCase().match(searchword.toLowerCase()))
      }
      if (field_name == 'url' || field_name == '') {
        this.all_url.length = 0;
        return (res.url.toLowerCase().match(searchword.toLowerCase()))
      }
    }); this.uniqueValue(field_name);
  }

  uniqueValue(field_name: any) {
    const option = this.option;
    let length = option.length;
    for (let i = 0; i < length; i++) {
      if (!this.all_title.some(el => el.text === option[i].title) && (field_name == 'title' || field_name == '')) {
        var element = { text: option[i].title, value: option[i].title };
        this.all_title.push(element);
      }
      if (!this.all_subtitle.some(el => el.text === option[i].subtitle) && (field_name == 'subtitle' || field_name == '')) {
        var element = { text: option[i].subtitle, value: option[i].subtitle };
        this.all_subtitle.push(element);
      }
      if (!this.all_url.some(el => el.text === option[i].url) && (field_name == 'url' || field_name == '')) {
        var element = { text: option[i].url, value: option[i].url };
        this.all_url.push(element);
      }
    }
  }

  triggerSearch() {
    // this.getData();
  }

}
