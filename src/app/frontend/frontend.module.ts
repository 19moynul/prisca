import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendRoutingModule } from './frontend-routing.module';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbLayoutModule, NbSidebarModule, NbMenuModule, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule, NbPopoverModule, NbTabsetModule, NbDialogModule, NbCheckboxModule, NbAccordionModule, NbStepperModule } from '@nebular/theme';
import { ThemeModule } from '../../../ngx-admin/src/app/@theme/theme.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { MasterModule } from './master/master.module';
import { FeaturedComponent } from './home/featured/featured.component';
import { LatestComponent } from './home/latest/latest.component';
import { CategoryComponent } from './home/category/category.component';
import { AdvertisementComponent } from './home/advertisement/advertisement.component';
import { CategoryProductComponent } from './home/category-product/category-product.component';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './product/details/details.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewsLaterComponent } from './home/news-later/news-later.component';
import { BrandStoryComponent } from './brand-story/brand-story.component';
import { ContactComponent } from './contact/contact.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ReletedProductComponent } from './home/releted-product/releted-product.component';
import { CartComponent } from './cart/cart.component';
import { OtherComponent } from './other/other.component';
import { ImagesComponent } from './home/images/images.component';



@NgModule({
  declarations: [HomeComponent, FeaturedComponent, LatestComponent, CategoryComponent, AdvertisementComponent, CategoryProductComponent, ProductComponent, DetailsComponent, CategoriesComponent, NewsLaterComponent, BrandStoryComponent, ContactComponent, AuthenticationComponent, ReletedProductComponent, CartComponent, OtherComponent, ImagesComponent],
  imports: [
    CommonModule,
    MasterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbDialogModule.forRoot(),
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbPopoverModule,
    NbTabsetModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    NbAccordionModule,
    NbStepperModule,
    AdminRoutingModule,
  ]
})
export class FrontendModule { }
