import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import {VstsProject, VstsProjectList} from '../../vsts/vsts-project';

import {LoginDialogComponent} from '../login-dialog/login-dialog.component';
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import {VstsDataService} from '../../vsts/vsts-data.service';

@Component({
  selector: 'follow-vsts-profile',
  templateUrl: './vsts-profile.component.html',
  styleUrls: ['./vsts-profile.component.css']
})
export class VstsProfileComponent implements OnInit {

  public buttonLabel: string = 'Connect VSTS';

  constructor(public dialog: MdDialog, public vstsDataService: VstsDataService) {}

  openDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, { data: {profile: "vsts"} });
    dialogRef.afterClosed().subscribe(result => {
      this.vstsDataService.getProjects().subscribe(list => {
        this.buttonLabel = (list.count === 0) ? 'Connect VSTS' : 'Connected (' + list.count + ' prj)';
      });
    });
  }

  ngOnInit() {
    
    this.vstsDataService.projects.subscribe(list => {
      this.buttonLabel = (list.count === 0) ? 'Connect VSTS' : 'Connected (' + list.count + ' prj)';
    });

    this.vstsDataService.getProjects().subscribe(list => {
      this.buttonLabel = (list.count === 0) ? 'Connect VSTS' : 'Connected (' + list.count + ' prj)';
    });;
  }

}
