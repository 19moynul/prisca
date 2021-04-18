import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master.component';
import { SliderComponent } from './slider/slider.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterPartComponent } from './footer-part/footer-part.component';
import { SearchComponent } from './navbar/search/search.component';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbLayoutModule, NbMenuModule, NbPopoverModule, NbSelectModule, NbSidebarModule, NbTabsetModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from '../../admin/admin-routing.module';



@NgModule({
  declarations: [MasterComponent, SliderComponent, NavbarComponent, FooterPartComponent, SearchComponent],
  imports: [
    CommonModule,
    NbDialogModule,
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbSelectModule,
    NbButtonModule,
    NbPopoverModule,
    NbTabsetModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  exports:[
   MasterComponent,
   SliderComponent,
   FooterPartComponent,
   NavbarComponent,
  ]
})
export class MasterModule { }
