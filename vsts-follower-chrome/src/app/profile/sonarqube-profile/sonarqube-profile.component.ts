import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import {LoginDialogComponent} from '../login-dialog/login-dialog.component';

@Component({
  selector: 'follow-sonarqube-profile',
  templateUrl: './sonarqube-profile.component.html',
  styleUrls: ['./sonarqube-profile.component.css']
})
export class SonarqubeProfileComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, { data: {profile: "sonarqube"} });
    dialogRef.afterClosed().subscribe(result => {
      //TODO: Variabilize button content !
    });
  }

}
