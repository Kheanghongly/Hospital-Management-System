import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'signIn',
  templateUrl: './body-signIn.component.html',
  styleUrls: ['./body-signIn.component.css'],
})
export class SignInComponent implements OnInit {
  status_response: string;
  response: any;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private _toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,20}'
          ),
        ],
      ],
    });
  }

  onregisterSubmit() {
    var request = this.registerForm.value;
    this.auth.signin(request).subscribe((res) => {
      this.response = res;

      if (this.response['status'] === 'Fail') {
        this._toastr.error('Email or Password invalid', 'Hello');
      }

      if (this.response['select_role'] === 'Admin') {
        localStorage.setItem('token', this.response.token);
        this.router.navigate(['/admin/user']);
      }
    });
  }
}
