import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutInfoListComponent } from './about-info/about-info-list/about-info-list.component';
import { CreateAboutInfoComponent } from './about-info/create-about-info/create-about-info.component';
import { AboutusBannerEditComponent } from './aboutus-banner/aboutus-banner-edit/aboutus-banner-edit.component';
import { AboutusBannerListComponent } from './aboutus-banner/aboutus-banner-list/aboutus-banner-list.component';
import { AdminListComponent } from './admins/admin-list/admin-list.component';
import { CreareAdminComponent } from './admins/creare-admin/creare-admin.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { CreateBannerComponent } from './banner/create-banner/create-banner.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';
import { CreateContactComponent } from './contact/create-contact/create-contact.component';
import { CreateFooterCardComponent } from './footer-card/create-footer-card/create-footer-card.component';
import { FooterCardListComponent } from './footer-card/footer-card-list/footer-card-list.component';
import { FooterCardComponent } from './footer-card/footer-card.component';
import { CreateHomeBannerComponent } from './home-banner/create-home-banner/create-home-banner.component';
import { HomeBannerListComponent } from './home-banner/home-banner-list/home-banner-list.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ViewOrderComponent } from './order/view-order/view-order.component';
import { OtherEditComponent } from './other/other-edit/other-edit.component';
import { OtherListComponent } from './other/other-list/other-list.component';
import { OtherViewComponent } from './other/other-view/other-view.component';
import { ColorComponent } from './product/color/color.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { EditSocialComponent } from './social/edit-social/edit-social.component';
import { SocialListComponent } from './social/social-list/social-list.component';
import { SocialComponent } from './social/social.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'banner/create',
    component:CreateBannerComponent
  },
  {
    path:'banner/list',
    component:BannerListComponent
  },
  {
    path:'banner/edit/:id',
    component:CreateBannerComponent
  },
  {
    path:'home-banner',
    component:HomeBannerComponent
  },
  {
    path:'product/create',
    component:CreateProductComponent
  },
  {
    path:'product/list',
    component:ListProductComponent
  },
  {
    path:'product/edit/:id',
    component:CreateProductComponent
  },
  {
    path:'product/view/:id',
    component:ViewProductComponent
  },
  {
    path: 'order',
    component: OrderListComponent,
  },
  {
    path: 'order/:id',
    component: ViewOrderComponent,
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'social',
    component:SocialComponent,
  },
  {
    path:'aboutus/banner/list',
    component:AboutusBannerListComponent,
  },
  {
    path:'aboutus/banner/edit/:id',
    component:AboutusBannerEditComponent,
  },
  {
    path:'aboutus/info/list',
    component:AboutInfoListComponent,
  },
  {
    path:'aboutus/info/edit/:id',
    component:CreateAboutInfoComponent,
  },
  {
    path:'social/list',
    component:SocialListComponent,
  },
  {
    path:'social/edit/:id',
    component:EditSocialComponent,
  },
  {
    path:'contact/list',
    component:ContactListComponent,
  },
  {
    path:'contact/edit/:id',
    component:CreateContactComponent,
  },
  {
    path:'news-letter',
    component:NewsLetterComponent,
  },
  {
    path:'others/list',
    component:OtherListComponent,
  },
  {
    path:'others/edit/:id',
    component:OtherEditComponent,
  },
  {
    path:'others/view/:id',
    component:OtherViewComponent,
  },
  {
    path:'footer-card',
    component:FooterCardComponent,
  },
  {
    path:'admins/list',
    component:AdminListComponent,
  },
  {
    path:'admins/create',
    component: CreareAdminComponent,
  },
  {
    path:'users/list',
    component: UsersComponent,
  },
  {
    path:'change-password',
    component: ChangePasswordComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
