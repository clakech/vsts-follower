import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/merge';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const STORAGE_NAME = "VstsSelectedBuildIds";

@Injectable()
export class SelectedBuildsService {
  public selectedBuilds: Observable<Array<SelectedBuild>>;
  public emitter: any;

  constructor() {
    this.selectedBuilds = Observable.create(observer => {
      this.emitter = observer;
      setTimeout(() => {
        this.emitter.next(this.getSelectedBuilds());
      });
    });
  }

  getSelectedBuilds(): Array<SelectedBuild> {
    let value = new Array<SelectedBuild>();
    const dataStr = localStorage.getItem(STORAGE_NAME);
    value = JSON.parse(dataStr);
    return value;
  }

  toggleSelectedBuild(selection: SelectedBuild) {
    let builds = this.getSelectedBuilds();

    if (builds == null) {
      builds = new Array<SelectedBuild>();
    }
    let index = builds.findIndex(element => {
      return (element.buildDefinitionId === selection.buildDefinitionId && element.projectGuid === selection.projectGuid);
    });

    if (index === -1) {
      builds.push(selection);
    } else {
      builds.splice(index, 1);
    }

    this.emitter.next(
      this.saveSelectedBuilds(builds)
    );

  }

  saveSelectedBuilds(selection: Array<SelectedBuild>): Array<SelectedBuild> {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(selection));
    return this.getSelectedBuilds();
  }

}

export class SelectedBuild {
  public projectGuid: string;
  public buildDefinitionId: number;

  constructor(projectIdentifier: string, buildDefinitionIdentifier: number) {
    this.projectGuid = projectIdentifier;
    this.buildDefinitionId = buildDefinitionIdentifier;
  }
}
