import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder } from '@angular/forms';
import { AuthService } from "../../auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import {  ToastrService } from 'ngx-toastr';

//this.router.navigate(['/verifycode'])
@Component({
  selector: 'verify-signUp',
  templateUrl: 'verifysignUp.component.html',
  styleUrls: ['verifysignUp.component.css']
})

export class VerifySignupComponent implements OnInit {
  @Input() id: number;
  response:any;
  status_response:string;
  verify:any;
  verifyForm: FormGroup;

  constructor( private formBuilder:FormBuilder, private auth: AuthService ,private route: ActivatedRoute, private _toastr: ToastrService, private router: Router){}

  ngOnInit(){

    this.verifyForm = this.formBuilder.group({

      code:["",[
        Validators.required,
      ]]
    })
  }

  onverifySubmit(){
  //Submit code
    var request = this.verifyForm.value;
    this.auth.verify_code(request,this.id).subscribe(res=>{
      this.response = res;
      this.status_response = this.response['status'];
      if(this.status_response === "success"){
        this._toastr.success("Wait for admin aproves your account", "Account Created success");
      }
      else{
        this._toastr.error("Invalid code", "Email");
      }
    });
  }
  //ReSend code to user
  resendCode(){
    this._toastr.info("Code has been sent", "Let's check your email");
    this.auth.verify_resendcode(this.id).subscribe(res=>{
      this.response = res;
    });
  }

}
