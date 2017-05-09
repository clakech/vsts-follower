import { Component, OnInit } from '@angular/core';
import { FullProject, MainBuildsInfo, VstsBuild, VstsBuildDefinition, VstsProject } from '../../vsts/vsts-project';
import { SelectedBuild, SelectedBuildsService } from '../selected-builds.service';

import { VstsDataService } from '../../vsts/vsts-data.service';

@Component({
  selector: 'follow-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedBuilds: Array<SelectedBuild> = new Array<SelectedBuild>();

  constructor(public selectedBuildService: SelectedBuildsService, public vstsDataService: VstsDataService) { }

  ngOnInit() {
    this.selectedBuildService.selectedBuilds.subscribe(builds => {
      this.selectedBuilds = builds;
    });
  }


}
