import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LayoutComponent } from './component/layout/layout.component';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SettingComponent } from './component/setting/setting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChannelComponent } from './component/channel/channel.component';
import { MarkAsteriskDirective } from './directive/mark-asterisk.directive';
import { AddChannelComponent } from './component/add-channel/add-channel.component';
import { AddSuperChannelComponent } from './component/add-super-channel/add-super-channel.component';
import { AddGigaChannelComponent } from './component/add-giga-channel/add-giga-channel.component';
import { DeleteChannelComponent } from './component/delete-channel/delete-channel.component';
import { ManageUserComponent } from './component/manage-user/manage-user.component';
import { RemoveUserComponent } from './component/remove-user/remove-user.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { ManageLinkComponent } from './component/manage-link/manage-link.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CreateLinkComponent } from './component/create-link/create-link.component';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { DeleteLinkComponent } from './component/delete-link/delete-link.component';
import { RequestJoinComponent } from './component/request-join/request-join.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    SettingComponent,
    ChannelComponent,
    MarkAsteriskDirective,
    AddChannelComponent,
    AddSuperChannelComponent,
    AddGigaChannelComponent,
    DeleteChannelComponent,
    ManageUserComponent,
    RemoveUserComponent,
    AddUserComponent,
    ManageLinkComponent,
    CreateLinkComponent,
    DeleteLinkComponent,
    RequestJoinComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxUiLoaderModule,
    ClipboardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
