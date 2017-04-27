import { Component, OnInit, Inject, Optional } from '@angular/core';
import {MdDialogRef, MD_DIALOG_DATA} from '@angular/material';
import { ProfileService, ProfileType } from '../profile.service';
import { ProfileCredentials } from '../profile-credentials';

@Component({
  selector: 'follow-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  public url: string;
  public login: string;
  public password: string;

  constructor(public dialogRef: MdDialogRef<LoginDialogComponent>, public service: ProfileService, @Optional() @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    const result = this.service.getProfile(this.data.profile);
    if (result) {
      this.url = result.url;
      this.login = result.login;
      this.password = result.password;
    }

  }

  saveData() {
    const toSet: ProfileCredentials = new ProfileCredentials();
    toSet.url = this.url;
    toSet.login = this.login;
    toSet.password = this.password;
    this.service.setProfile(this.data.profile, toSet);
    this.dialogRef.close();
  }

  profileToDisplay() {
    if (!this.data.profile) {
      return this.data.profile;
    }
    return this.data.profile.charAt(0).toUpperCase() + this.data.profile.substr(1);
  }

}
