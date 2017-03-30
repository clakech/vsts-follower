import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from '@angular/material';

@Component({
  selector: 'follow-vsts-login-dialog',
  templateUrl: './vsts-login-dialog.component.html',
  styleUrls: ['./vsts-login-dialog.component.css']
})
export class VstsLoginDialogComponent implements OnInit {

  public url: string;
  public login: string;
  public password: string;

  constructor(public dialogRef: MdDialogRef<VstsLoginDialogComponent>) { }

  ngOnInit() {
  }

}
