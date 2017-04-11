import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';
import { VstsProfileService } from '../vsts-profile.service';

@Component({
  selector: 'follow-vsts-login-dialog',
  templateUrl: './vsts-login-dialog.component.html',
  styleUrls: ['./vsts-login-dialog.component.css']
})
export class VstsLoginDialogComponent implements OnInit {

  public url: string;
  public login: string;
  public password: string;

  constructor(public dialogRef: MdDialogRef<VstsLoginDialogComponent>,public service: VstsProfileService) { }

  ngOnInit() {
    const result = this.service.getVstsProfile();
    if (result) {
      this.url = result.url;
      this.login = result.login;
      this.password = result.token;
    }
  }

}
