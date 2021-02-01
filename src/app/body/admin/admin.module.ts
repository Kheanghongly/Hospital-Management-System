import { MaterialsModule } from './../../materials.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from '../user/user.component';
import { UserRequestComponent } from '../user_request/user_request.component';
import { AdduserComponent } from '../user/user.component';
import { DeleteUserComponent } from '../user/user.component';
import { EditUserComponent } from '../user/user.component';
import { ApproveUserComponent } from '../user_request/user_request.component';
import { RejectUserComponent } from '../user_request/user_request.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { UserHistoryComponent } from '../user-history/user-history.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from '../header/header.component';
import { AdminRoutingModule } from "../admin/admin-routing.module";

@NgModule({
  declarations: [
    UserComponent,
    UserRequestComponent,
    ApproveUserComponent,
    RejectUserComponent,
    AdduserComponent,
    DeleteUserComponent,
    EditUserComponent,
    UserHistoryComponent,
    SideNavComponent,
    AdminComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialsModule,
    AdminRoutingModule
    // ToastrModule.forRoot(
    //   {
    //     timeOut: 1000,
    //     positionClass: 'toast-top-right'
    //   }
    // ),

  ],
  providers: [],
  bootstrap: [],
})
export class AdminModule {}
