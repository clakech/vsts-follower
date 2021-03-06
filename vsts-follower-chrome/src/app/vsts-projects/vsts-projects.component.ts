import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Component, OnInit } from '@angular/core';
import { FullProject, VstsProject } from '../vsts/vsts-project';

import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { VstsDataService } from '../vsts/vsts-data.service';

@Component({
  selector: 'follow-vsts-projects',
  templateUrl: './vsts-projects.component.html',
  styleUrls: ['./vsts-projects.component.css']
})
export class VstsProjectsComponent implements OnInit {
  public projects: FullProject[];
  public dynh: boolean = true;

  constructor(public vstsDataService: VstsDataService) {
  }

  ngOnInit() {
    /*this.vstsDataService.projects.subscribe(list => {
      if (list.count > 0) {
        this.projects = list.value.sort((a, b) => {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        });
      }
    });*/

    this.vstsDataService.vstsProjectList.subscribe(list => {
      this.projects = list;
    });
  }

}
