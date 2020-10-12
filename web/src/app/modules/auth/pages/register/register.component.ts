import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validators';

import { ApiService } from '../../../../core/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public frm: FormGroup;

  public submitted: boolean;
  public hasFailed: boolean;

  constructor(private api: ApiService, private fb: FormBuilder, private router: Router) {
    this.frm = fb.group(
      {
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: MustMatch('password', 'confirmPassword'),
      }
    );
    this.submitted = false;
  }

  ngOnInit(): void {}

  doRegistration() {
    this.submitted = true;

    if (this.frm.invalid) {
      return;
    }

    const username = this.frm.get('username').value;
    const password = this.frm.get('password').value;

    this.api.register(username, password).subscribe(
      (response) => {
        this.router.navigate(['login']);
      },
      (error) => {
        console.log(error);
        this.hasFailed = true;
      }
    );
  }
}
