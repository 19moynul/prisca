import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiSearchComponent } from './mi-search/mi-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbLayoutModule, NbSidebarModule, NbMenuModule, NbCardModule, NbInputModule, NbSelectModule, NbButtonModule, NbPopoverModule, NbTabsetModule, NbAutocompleteModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';



@NgModule({
  declarations: [MiSearchComponent],
  imports: [
    CommonModule,
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
    NbAutocompleteModule,
    ReactiveFormsModule,
  ],
  exports:[
    MiSearchComponent
  ]
})
export class SharedModule { }
