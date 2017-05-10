import 'rxjs/add/operator/last';
import 'rxjs/add/operator/map';

import { Component, Input, OnInit } from '@angular/core';
import { FullProject, MainBuildsInfo, VstsBuild, VstsBuildDefinition, VstsProject } from '../../vsts/vsts-project';
import { SelectedBuild, SelectedBuildsService } from '../selected-builds.service';

import { VstsDataService } from '../../vsts/vsts-data.service';

@Component({
  selector: 'follow-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public selectedBuilds: Array<MainBuildsInfo> = new Array<MainBuildsInfo>();
  private 

  constructor(public selectedBuildService: SelectedBuildsService, public vstsDataService: VstsDataService) { }

  ngOnInit() {
    this.selectedBuildService.selectedBuilds.subscribe(builds => {
      let projects = builds.map(build => {
        let prj = new VstsProject();
        prj.id = build.projectGuid;
        return new FullProject(prj);
      }).filter((v, i, a) => a.findIndex(r => v.project.id === r.project.id) === i);
      this.vstsDataService.getDefinitionsBatch(projects).subscribe(definitions => {
        let allDefinitions: VstsBuildDefinition[] = [].concat(...definitions);
        let selectedDefinitions = allDefinitions
              .filter(definition => this.isDefinitionSelected(definition))
              .sort((a, b) => (a.project.name + a.name).localeCompare(b.project.name + b.name));
        this.vstsDataService.getBuildsForDefinitionGroup(selectedDefinitions).subscribe(buildInfos => {
          this.selectedBuilds = buildInfos;
          this.vstsDataService.getTestResultsForDefinitionGroup(buildInfos).subscribe(buildsWithTests => {
            this.selectedBuilds = buildsWithTests;
            this.vstsDataService.getTestCoverageForDefinitionGroup(buildsWithTests).subscribe(buildsWithCoverages => {
                this.selectedBuilds = buildsWithCoverages;
              });
          });
        });
      });
    });
  }

  isDefinitionSelected(definition: VstsBuildDefinition) {
    return (this.selectedBuildService.getSelectedBuilds().findIndex(selection => (selection.projectGuid === definition.project.id && selection.buildDefinitionId === definition.id)) !== -1);
  }
}
