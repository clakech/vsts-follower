import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {MdDialog} from '@angular/material';
import {VstsLoginDialogComponent} from './vsts-login-dialog/vsts-login-dialog.component';
import {VstsDataService} from '../vsts-data.service';
import {VstsProject, VstsProjectList} from '../vsts-project';

@Component({
  selector: 'follow-vsts-profile',
  templateUrl: './vsts-profile.component.html',
  styleUrls: ['./vsts-profile.component.css']
})
export class VstsProfileComponent implements OnInit {

  public buttonLabel: string = 'Connect VSTS';
  private projects: Observable<VstsProjectList>;

  constructor(public dialog: MdDialog, public vstsDataService: VstsDataService) {}

  openDialog() {
    const dialogRef = this.dialog.open(VstsLoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      //TODO: Variabilize button content !
    });
  }

  ngOnInit() {
    this.vstsDataService.getProjects().map(list => {
      this.buttonLabel = (list.count === 0) ? 'Connect VSTS' : 'Connected (' + list.count + ' prj)';
    });/*
    this.projects = this.vstsDataService.getProjects();
    this.projects.subscribe(list => {
        this.buttonLabel = (list.count === 0) ? 'Connect VSTS' : 'Connected (' + list.count + ' prj)';
    });*/
  }

}
