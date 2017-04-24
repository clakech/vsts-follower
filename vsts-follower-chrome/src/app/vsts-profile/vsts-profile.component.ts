import { Component, OnInit } from '@angular/core';

import {MdDialog} from '@angular/material';
import {VstsLoginDialogComponent} from './vsts-login-dialog/vsts-login-dialog.component';

@Component({
  selector: 'follow-vsts-profile',
  templateUrl: './vsts-profile.component.html',
  styleUrls: ['./vsts-profile.component.css']
})
export class VstsProfileComponent implements OnInit {

  public buttonLabel: string = 'Connect VSTS';

  constructor(public dialog: MdDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(VstsLoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      //TODO: Variabilize button content !
    });
  }

  ngOnInit() {
  }

}
