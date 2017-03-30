import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {VstsLoginDialogComponent} from './vsts-login-dialog/vsts-login-dialog.component';

@Component({
  selector: 'follow-vsts-profile',
  templateUrl: './vsts-profile.component.html',
  styleUrls: ['./vsts-profile.component.css'],
  entryComponents: [VstsLoginDialogComponent]
})
export class VstsProfileComponent implements OnInit {

  constructor(public dialog: MdDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(VstsLoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log(result.login);
    });
  }

  connectAndSave() {
    // Do nothing
  }

  ngOnInit() {
  }

}
