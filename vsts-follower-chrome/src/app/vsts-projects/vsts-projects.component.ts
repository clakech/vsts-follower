import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { VstsProject, VstsProjectList } from '../vsts/vsts-project';

import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { VstsDataService } from '../vsts/vsts-data.service';

@Component({
  selector: 'follow-vsts-projects',
  templateUrl: './vsts-projects.component.html',
  styleUrls: ['./vsts-projects.component.css']
})
export class VstsProjectsComponent implements OnInit {
  public projects: VstsProject[];
  constructor(public vstsDataService: VstsDataService) { }

  ngOnInit() {
    this.vstsDataService.projects.subscribe(list => {
      if (list.count > 0) {
        this.projects = list.value.sort((a, b) => {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        });
      }
    });
  }

}
