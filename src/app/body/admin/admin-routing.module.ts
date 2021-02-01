import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { UserRequestComponent } from '../user_request/user_request.component';
import { UserHistoryComponent } from '../user-history/user-history.component';
import { NgModule } from '@angular/core';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'admin/user', component: UserComponent },
      { path: 'admin/user/request', component: UserRequestComponent },
      { path: 'admin/user-history', component: UserHistoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(AppRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
