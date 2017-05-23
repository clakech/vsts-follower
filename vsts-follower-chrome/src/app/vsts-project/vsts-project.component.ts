import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Component, Input, OnInit } from '@angular/core';
import { FullProject, VstsProject } from '../vsts/vsts-project';

import { Observable } from 'rxjs/Observable';
import { VstsDataService } from '../vsts/vsts-data.service';

@Component({
  selector: 'follow-vsts-project',
  templateUrl: './vsts-project.component.html',
  styleUrls: ['./vsts-project.component.css']
})
export class VstsProjectComponent implements OnInit {
  @Input() project: FullProject = new FullProject(new VstsProject());
  @Input() projects: Array<FullProject> = new Array<FullProject>();

  constructor(public vstsDataService: VstsDataService) { }

  ngOnInit() {
  }

  singleProjectMode(): boolean {
    return (!this.projects || this.projects.length === 0);
  }

}
