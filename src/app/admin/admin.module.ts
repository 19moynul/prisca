import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MasterComponent } from './master/master.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbLayoutModule, NbSidebarModule, NbMenuModule, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule, NbPopoverModule, NbTabsetModule, NbAutocompleteModule, NbToggleModule } from '@nebular/theme';
import { ThemeModule } from '../../../ngx-admin/src/app/@theme/theme.module';
import { CreateDiscountBannerComponent } from './discount-banner/create-discount-banner/create-discount-banner.component';
import { DiscountBannerListComponent } from './discount-banner/discount-banner-list/discount-banner-list.component';
import { EditSocialComponent } from './social/edit-social/edit-social.component';
import { CreateBannerComponent } from './banner/create-banner/create-banner.component';
import { BannerListComponent } from './banner/banner-list/banner-list.component';
import { CreateAboutInfoComponent } from './about-info/create-about-info/create-about-info.component';
import { AboutInfoListComponent } from './about-info/about-info-list/about-info-list.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CreateContactComponent } from './contact/create-contact/create-contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { CreateHomeBannerComponent } from './home-banner/create-home-banner/create-home-banner.component';
import { HomeBannerListComponent } from './home-banner/home-banner-list/home-banner-list.component';
import { SocialComponent } from './social/social.component';
import { SharedModule } from '../shared/shared.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { AboutusBannerComponent } from './aboutus-banner/aboutus-banner.component';
import { AboutusBannerListComponent } from './aboutus-banner/aboutus-banner-list/aboutus-banner-list.component';
import { AboutusBannerEditComponent } from './aboutus-banner/aboutus-banner-edit/aboutus-banner-edit.component';
import { SocialListComponent } from './social/social-list/social-list.component';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import { OtherListComponent } from './other/other-list/other-list.component';
import { OtherEditComponent } from './other/other-edit/other-edit.component';
import { OtherViewComponent } from './other/other-view/other-view.component';
import { FooterCardComponent } from './footer-card/footer-card.component';
import { CreateFooterCardComponent } from './footer-card/create-footer-card/create-footer-card.component';
import { FooterCardListComponent } from './footer-card/footer-card-list/footer-card-list.component';
import { ViewProductComponent } from './product/view-product/view-product.component';
import { ColorComponent } from './product/color/color.component';
import { CreateComponent } from './product/color/create/create.component';
import { ListComponent } from './product/color/list/list.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminListComponent } from './admins/admin-list/admin-list.component';
import { CreareAdminComponent } from './admins/creare-admin/creare-admin.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { ViewOrderComponent } from './order/view-order/view-order.component';
import { MailComponent } from './mail/mail.component';
import { DashboardComponent } from './order/dashboard/dashboard.component';


@NgModule({
  declarations: [MasterComponent, CreateDiscountBannerComponent, DiscountBannerListComponent, EditSocialComponent, CreateBannerComponent, BannerListComponent, CreateAboutInfoComponent, AboutInfoListComponent, CreateProductComponent, ListProductComponent, CreateContactComponent, ContactListComponent, CreateHomeBannerComponent, HomeBannerListComponent, SocialComponent, HomeBannerComponent, AboutusBannerComponent, AboutusBannerListComponent, AboutusBannerEditComponent, SocialListComponent, NewsLetterComponent, OtherListComponent, OtherEditComponent, OtherViewComponent, FooterCardComponent, CreateFooterCardComponent, FooterCardListComponent, ViewProductComponent, ColorComponent, CreateComponent, ListComponent, LoginComponent, AdminListComponent, CreareAdminComponent, UsersComponent, ChangePasswordComponent, OrderListComponent, ViewOrderComponent, MailComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbPopoverModule,
    NbTabsetModule,
    NbToggleModule,
    NbAutocompleteModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
