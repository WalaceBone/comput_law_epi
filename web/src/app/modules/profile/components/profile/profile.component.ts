import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api/api.service';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User = new User();

  public frm: FormGroup;
  public frmUsername: FormGroup;

  public hasFailed: boolean;
  public success: boolean;
  public errorMessage: string;

  public hasFailedUsername: boolean;
  public successUsername: boolean;

  constructor(private api: ApiService, private fb: FormBuilder,
              private auth: AuthService)
    {
      this.frm = fb.group({
        newPassword: [''],
        newPasswordConfirm: ['']
      });
      this.frmUsername = fb.group({
        newUsername: [this.user.username, Validators.required]
      });

      this.hasFailed = false;
      this.success = false;

      this.hasFailedUsername = false;
      this.successUsername = false;
    }

  ngOnInit(): void {
    this.api.getProfile().subscribe(res => {
      this.user = res;
    });
  }

  changeUsername() {
    const newUsername = this.frmUsername.get('newUsername').value;

    this.api
      .modifyProfile({username: newUsername})
      .subscribe((res) => {
        this.hasFailedUsername = false;
        this.successUsername = true;
        this.user.username = newUsername;
      },
        (error) => {
          this.hasFailedUsername = true;
          this.errorMessage = error;
        });
  }

  changePassword() {
    const newPassword = this.frm.get('newPassword').value;
    const newPasswordConfirmation = this.frm.get('newPasswordConfirmation').value;

    if (newPassword !== newPasswordConfirmation) {
      return;
    }

    this.api
      .modifyProfile({password: newPassword})
      .subscribe((res) => {
        this.frm.setValue({newPassword: '', newPasswordConfirmation: ''});
        this.hasFailed = false;
        this.success = true;
      },
        (error) => {
        this.hasFailed = true;
        this.errorMessage = error;
        });
  }

}
