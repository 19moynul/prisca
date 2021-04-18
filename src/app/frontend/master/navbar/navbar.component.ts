import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'ngx-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  dialogRef:any;
  light_theme:boolean = true;
  itemLength:any = 0;
  logout:boolean = false;
  language:any[]=[
    {image:'assets/images/french.png',name:'French'},
    {image:'assets/images/french.png',name:'English'},
    { image: 'assets/images/french.png', name:'Spanis'},
    { image: 'assets/images/french.png', name:'Belgium'},
    { image: 'assets/images/french.png', name:'Garmani'}
  ]
  constructor(private dialogService: NbDialogService, private router:Router , private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.calculateCartItem();
    var theme = localStorage.getItem('theme')
    if(theme == 'light'){
      this.light_theme = true;
    }else if(theme == 'dark'){
      this.light_theme = false;
    }
    if(localStorage.getItem('token')){
      this.logout = true;
    }
  }

  logOut(){
    localStorage.removeItem('token');
    this.logout = false;
  }

 openWithBackdropClick() {
    this.open(true);
  }

  protected open(closeOnBackdropClick: boolean) {
    console.log('we are here')
    this.dialogService.open(SearchComponent, { closeOnBackdropClick });
  }

  close() {
    this.dialogRef.close();
  }

  setTheme(event){
    if(event.target.checked){
      sessionStorage.setItem('theme', 'dark');
    }else{
      sessionStorage.setItem('theme', 'light');
    }
    window.location.reload();
  }

  navigateTopage(router:any){
    this.router.navigate([router]);
  }

  calculateCartItem(){
    var item = JSON.parse(localStorage.getItem('items'));
    this.itemLength = item.length;
    console.log(this.itemLength);
  }


}
