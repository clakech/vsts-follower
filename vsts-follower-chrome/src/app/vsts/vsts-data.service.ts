import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';

import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { VstsBuild, VstsBuildDefinition, VstsProject, VstsProjectList } from './vsts-project';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfileCredentials } from '../profile/profile-credentials';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class VstsDataService {

  private projectListSuffix: string = "/defaultcollection/_apis/projects?api-version=2.0";
  private requestOptions: RequestOptions;
  private profile: ProfileCredentials;
  public projects: Observable<VstsProjectList>;
  public emitter: any;
  public isBusy: Observable<boolean>;
  public busyEmitter: any;

  constructor(public profileService: ProfileService, public http: Http) {
    this.projects = new Observable<VstsProjectList>(e => this.emitter = e);
    this.isBusy = new Observable<boolean>(e => this.busyEmitter = e);
  }

  private setProfileAndHeaders() {
    this.profile = this.profileService.getProfile("vsts");
    if (this.profile) {
      let basic: string = 'Basic ' + btoa(this.profile.login.toLowerCase() + ':' + this.profile.password);
      let headers = new Headers({ 'Authorization': basic });
      this.requestOptions = new RequestOptions({ headers: headers });
    }
  }

  launchGetForUrl(url: string): Observable<Response> {
    return this.http.get(url, this.requestOptions)
      .retryWhen(error => error.delay(500))
      .timeout(6000);
  }

  getProjects(): Observable<VstsProjectList> {
    this.busyEmitter.next(true);
    return this.launchGetForUrl(this.getProjectsApiUrl())
      .map((resp) => {
        let newValue = new VstsProjectList(resp.text());
        this.emitter.next(newValue);
        this.busyEmitter.next(false);
        return newValue;
      });
  }

  getBuildDefinitionsForProject(project: VstsProject): Observable<VstsBuildDefinition[]> {
    //this.busyEmitter.next(true);
    return this.launchGetForUrl(this.getBuildDefinitionsUrl(project))
      .map((resp) => {
        let list: Array<VstsBuildDefinition> = new Array<VstsBuildDefinition>();
        try {
          let result = JSON.parse(resp.text()).value;
          result.forEach(buildDefinition => {
            let definition = new VstsBuildDefinition();
            definition.id = buildDefinition.id;
            definition.name = buildDefinition.name;
            definition.project = project;
            list.push(definition);
          });
        } catch (error) {
          console.log("json value bad format !");
        }
        //this.busyEmitter.next(false);
        return list;
      });
  }

  getTenLastBuildsForDefinition(definition: VstsBuildDefinition): Observable<VstsBuild[]> {
    //add queue system
    return this.launchGetForUrl(this.getTenLastBuildsUrl(definition))
      .map((resp) => {
        let list: Array<VstsBuild> = new Array<VstsBuild>();
        try {
          let result = JSON.parse(resp.text()).value;
          result.forEach(receivedBuild => {
            let build = new VstsBuild();
            build.id = receivedBuild.id;
            build.buildNumber = receivedBuild.buildNumber;
            build.reason = receivedBuild.reason;
            build.result = receivedBuild.result;
            build.queueTime = new Date(receivedBuild.queueTime);
            build.startTime = new Date(receivedBuild.startTime);
            build.finishTime = new Date(receivedBuild.finishTime);
            list.push(build);
          });
        } catch (error) {
          console.log("json value bad format !");
        }
        return list;
      });
  }

  getProjectsApiUrl(): string {
    this.setProfileAndHeaders();
    return this.profile.url + "/defaultcollection/_apis/projects?api-version=2.0";
  }

  getProjectApisUrl(project: VstsProject): string {
    this.setProfileAndHeaders();
    return this.profile.url + "/defaultcollection/" + project.id + "/_apis/";
  }

  getBuildDefinitionsUrl(project: VstsProject): string {
    return this.getProjectApisUrl(project) + "build/definitions?api-version=2.0&type=build";
  }

  getLastScheduledBuildUrl(projectApisUrl: string, buildDefinitionNumber: number): string {
    return projectApisUrl + "build/builds?definitions=" + buildDefinitionNumber.toString() + "&statusFilter=completed&$top=1&reasonFilter=schedule&api-version=2.0";
  }

  getLastManualBuildUrl(projectApisUrl: string, buildDefinitionNumber: number): string {
    return projectApisUrl + "build/builds?definitions=" + buildDefinitionNumber.toString() + "&statusFilter=completed&$top=1&reasonFilter=manual&api-version=2.0";
  }

  getLastTriggeredBuildUrl(projectApisUrl: string, buildDefinitionNumber: number): string {
    return projectApisUrl + "build/builds?definitions=" + buildDefinitionNumber.toString() + "&statusFilter=completed&$top=1&reasonFilter=triggered&api-version=2.0";
  }

  getTenLastBuildsUrl(buildDefinition: VstsBuildDefinition): string {
    return this.getProjectApisUrl(buildDefinition.project) + "build/builds?definitions=" + buildDefinition.id.toString() + "&statusFilter=completed&$top=10&api-version=2.0";
  }

  getTestResultUrlForBuild(projectApisUrl: string, buildId: number, includeFailureDetails: boolean): string {
    let url = projectApisUrl + "test/ResultSummaryByBuild?buildId=" + buildId.toString();
    if (includeFailureDetails) {
      url += "&includeFailureDetails=true";
    }
    return url;
  }

  getCodeCoverageUrlForBuild(projectApisUrl: string, buildId: number): string {
    return projectApisUrl + "test/ResultSummaryByBuild?buildId=" + buildId.toString();
  }

}
