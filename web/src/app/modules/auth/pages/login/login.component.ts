import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/api/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public frm: FormGroup;

  public submitted: boolean;
  public hasFailed: boolean;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.frm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.submitted = false;
  }

  ngOnInit(): void {}

  login(): void {
    this.submitted = true;

    if (this.frm.invalid) {
      return;
    }

    const username = this.frm.get('username').value;
    const password = this.frm.get('password').value;

    this.api.login(username, password).subscribe(
      (response) => {
        this.auth.signIn(response.accessToken, response.refreshToken);
        this.router.navigate(['menu']);
      },
      (error) => {
        console.log(error);
        this.hasFailed = true;
      }
    );
  }
}
