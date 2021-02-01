import { MaterialsModule } from './materials.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignInComponent } from './body/signIn/body-signIn.component';
import { CompareValidatorDirective } from './body/compare/compare.password.directive';
import { VerifySignupComponent } from './body/verify_signUp/verifysignUp.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './body/signUp/body-signUp.component';
import { AdminModule } from './body/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    CompareValidatorDirective,
    VerifySignupComponent,
  ],
  imports: [
    MaterialsModule,
    RouterModule.forRoot(AppRoutes),
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
    }),
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
