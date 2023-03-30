import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChannelComponent } from './component/add-channel/add-channel.component';
import { AddSuperChannelComponent } from './component/add-super-channel/add-super-channel.component';
import { ChannelComponent } from './component/channel/channel.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ManageLinkComponent } from './component/manage-link/manage-link.component';
import { ManageUserComponent } from './component/manage-user/manage-user.component';
import { SettingComponent } from './component/setting/setting.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent,
    pathMatch:'full'
  },
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  // },
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'setting',
    component:SettingComponent
  },
  {
    path:'channel',
    component:ChannelComponent
  },
  {
    path:'addchannel',
    component:AddChannelComponent
  },
  {
    path:'addchannel/:id',
    component:AddChannelComponent
  },
  {
    path:'addsuperchannel',
    component:AddSuperChannelComponent
  },
  {
    path:'users/:id',
    component:ManageUserComponent
  },
  {
    path:'link/:id',
    component:ManageLinkComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
