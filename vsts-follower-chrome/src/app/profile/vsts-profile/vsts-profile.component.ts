import { Component, OnInit } from '@angular/core';

import {MdDialog} from '@angular/material';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

@Component({
  selector: 'follow-vsts-profile',
  templateUrl: './vsts-profile.component.html',
  styleUrls: ['./vsts-profile.component.css']
})
export class VstsProfileComponent implements OnInit {

  public currentDomain: any;

  constructor(public dialog: MdDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, { data: {profile: "vsts"} });
    dialogRef.afterClosed().subscribe(result => {
      //TODO: Variabilize button content !
    });
  }

  ngOnInit() {
  }

}
