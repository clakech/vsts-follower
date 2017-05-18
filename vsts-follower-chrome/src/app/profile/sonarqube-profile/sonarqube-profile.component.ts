import { Component, OnInit } from '@angular/core';

import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {MdDialog} from '@angular/material';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'follow-sonarqube-profile',
  templateUrl: './sonarqube-profile.component.html',
  styleUrls: ['./sonarqube-profile.component.css']
})
export class SonarqubeProfileComponent implements OnInit {

  public buttonLabel: string = "Connect SonarQube";

  constructor(public dialog: MdDialog, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profilesInitiated.subscribe(profiles => {
      if (profiles.lastIndexOf("sonarqube") > -1) {
        this.buttonLabel = "SonarQube";
      } else {
        this.buttonLabel = "Connect SonarQube";
      }
    });
    this.profileService.getProfile("sonarqube");
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, { data: {profile: "sonarqube"} });
    dialogRef.afterClosed().subscribe(result => {
      //TODO: Variabilize button content !
    });
  }

}
