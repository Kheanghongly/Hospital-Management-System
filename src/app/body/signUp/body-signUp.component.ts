import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators , FormBuilder } from '@angular/forms';
import { AuthService } from "../../auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'signUp',
  templateUrl: './body-signUp.component.html',
  styleUrls: ['./body-signUp.component.css']
})
export class SignUpComponent implements OnInit{

  isSignUpSuccess: boolean = true;
  response: any;
  status_response: string;
  user_id: number;

  roles: Role[] = [
    {role: 'Patient'},
    {role: 'Doctor'},
    {role: 'Staff'},
  ];
  registerForm: FormGroup;

  constructor( private formBuilder:FormBuilder, private auth: AuthService, private _toastr: ToastrService ){}

  ngOnInit(){

    this.registerForm = this.formBuilder.group({

      name:["",[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]],
      email:["",[
        Validators.required,
        Validators.email
      ]],
      password:["",[
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}')
      ]],
      confirm_password:[ "",[
        Validators.required,

      ]],
      select_role:["",[
          Validators.required
      ]]

    })
  }

  onregisterSubmit(){

    var request = this.registerForm.value;
    //Send request to API
    this.auth.register(request).subscribe(res=>{
      this.response = res;
      this.status_response = this.response['status'];
    //Check condition before show up verificaon code page
      if (this.status_response==="success"){
        this.isSignUpSuccess = false;
      }else{
        this.isSignUpSuccess = true;
        this._toastr.error("Account already created","Signup failed");
      }
      this.user_id = this.response.UserID;
    });
  }

}

export interface Role{
  role:string;
}
