import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  //handleError'
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  httpHeaderWithToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    })
  }
  /*========================================
    HttpClient Send Request to API
  =========================================*/

  //user register account
  register(request) {
    return this.httpClient.post(environment.apiURL + "/crud/signup",request, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //create user by admin

  addnewUser(request) {
    return this.httpClient.post(environment.apiURL + "/crud/create_user_by_admin",request, this.httpHeaderWithToken)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //admin aprroved user
  user_approved() {
    return this.httpClient.get(environment.apiURL + "/find/approved",this.httpHeaderWithToken)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //user request to admin
  user_requested() {
    return this.httpClient.get(environment.apiURL + "/find/pending",this.httpHeaderWithToken)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //edit user by admin
  edit_user(request, id) {
    return this.httpClient.post(environment.apiURL + "/crud/edituser/" + id, request, this.httpHeaderWithToken)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //delete user by admin
  delete_user(id){
    return this.httpClient.delete(environment.apiURL + "/crud/delete_user/" + id, this.httpHeaderWithToken)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //signin account
  signin(request){
    return this.httpClient.post(environment.apiURL + "/crud/signin/",request, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //admin rejecting user
  reject_user(id:Number){
    return this.httpClient.delete(environment.apiURL + "/crud/reject_user/"+ id , this.httpHeaderWithToken)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //admin approving user
  approve_user(id){
    return this.httpClient.post(environment.apiURL + "/crud/approving/"+ id, this.httpHeaderWithToken)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //verify code
  verify_code(request,id){
    return this.httpClient.post(environment.apiURL + "/crud/confirm_email/"+id ,request, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Send code again
  verify_resendcode(id){
    return this.httpClient.post(environment.apiURL + "/crud/resendcode/"+id , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }



}
