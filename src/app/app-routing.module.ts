import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { MasterComponent } from './admin/master/master.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuard } from './_service/auth.guard';
import { LoginComponent } from './admin/login/login.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./frontend/frontend.module')
      .then(m => m.FrontendModule),
  },
  {
    path: 'admin',
    component: MasterComponent,
    canActivate:[AuthGuard],
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule),
  },
  {
    path:'auth/login',
    component:AdminLoginComponent
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
