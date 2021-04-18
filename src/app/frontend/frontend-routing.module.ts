import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { BrandStoryComponent } from './brand-story/brand-story.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NewsLaterComponent } from './home/news-later/news-later.component';
import { OtherComponent } from './other/other.component';
import { DetailsComponent } from './product/details/details.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
     path: '',
     component: HomeComponent,
  },
  {
     path: 'category',
     component: CategoriesComponent,
  },
  {
     path: 'contact',
     component: ContactComponent,
  },
  {
     path: 'login',
     component: AuthenticationComponent,
  },
  {
     path: 'brand-story',
     component: BrandStoryComponent,
  },
  {
     path: 'product',
     component: ProductComponent,
  },
  {
     path: 'cart',
     component: CartComponent,
  },
  {
     path: 'news-later',
     component: NewsLaterComponent,
  },
  // {
  //    path: ':category/product/discount/:',
  //    component: ProductComponent,
  // }
  {
    path: 'product/:product_name',
     component: DetailsComponent,
  },
  {
    path: 'our-authorigation/:url',
     component: OtherComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendRoutingModule { }
