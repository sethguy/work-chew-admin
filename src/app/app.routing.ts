import {RouterModule, Routes} from '@angular/router';
import { HelloComponent } from './hello.component';
import { PartnetListComponent } from './partnet-list/partnet-list.component';
import { LoginComponent } from './login/login.component';
import { EditPartnerComponent } from './edit-partner/edit-partner.component';

import { AuthGuard } from './app.guard'

const app_routes : Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EditPartnerComponent,
    canActivate:[AuthGuard],

  }, 
    {
    path: 'edit-partner',
    pathMatch: 'full',
    component: EditPartnerComponent,
    canActivate:[AuthGuard],

  }, 
  {
    path: 'partner-list',
    pathMatch: 'full',
    component: PartnetListComponent,
    canActivate:[AuthGuard],
  }, 
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  }, 
];

export const app_routing = RouterModule.forRoot(app_routes, {useHash: true});