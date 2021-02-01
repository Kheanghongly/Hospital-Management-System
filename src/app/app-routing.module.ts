import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './body/signUp/body-signUp.component';
import { SignInComponent } from './body/signIn/body-signIn.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { AuthenticationGuard } from './guards/authentication.guard';

export const AppRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  {
    path: 'home',
    component: AppComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./body/admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
