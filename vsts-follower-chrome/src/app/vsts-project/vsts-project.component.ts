import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Component, Input, OnInit } from '@angular/core';
import { VstsBuildDefinition, VstsProject, VstsProjectList } from '../vsts/vsts-project';

import { Observable } from 'rxjs/Observable';
import { VstsDataService } from '../vsts/vsts-data.service';

@Component({
  selector: 'follow-vsts-project',
  templateUrl: './vsts-project.component.html',
  styleUrls: ['./vsts-project.component.css']
})
export class VstsProjectComponent implements OnInit {
  @Input() project: VstsProject = new VstsProject();
  public buildDefinitions: Array<VstsBuildDefinition> = new Array<VstsBuildDefinition>();

  constructor(public vstsDataService: VstsDataService) { }

  ngOnInit() {
    this.vstsDataService.getBuildDefinitionsForProject(this.project).subscribe(buildDefinitions => {
      this.buildDefinitions = buildDefinitions;
    });
  }

}
