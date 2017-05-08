import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/merge';

import { FullProject, MainBuildsInfo, VstsBuild, VstsBuildDefinition, VstsProject, VstsProjectList } from './vsts-project';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

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

  public vstsProjectList: Observable<Array<FullProject>>;

  constructor(public profileService: ProfileService, public http: Http) {
    this.projects = new Observable<VstsProjectList>(e => this.emitter = e);
    this.isBusy = new Observable<boolean>(e => this.busyEmitter = e);
    //this.vstsProjectList = new Observable<Array<FullProject>>(e => this.busyEmitter = e);
    this.vstsProjectList = Observable.create(observer => {
      setTimeout(() => {
        this.initiateProjects(observer);
      });
    });
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

  initiateProjects(emitter) {
    this.busyEmitter.next(true);
    let projects: Array<FullProject> = new Array<FullProject>();
    this.getProjectsList().subscribe(projectReturnedList => {
      projectReturnedList.forEach(project => {
        projects.push(new FullProject(project));
        emitter.next(projects);
      });
      this.getDefinitionsBatch(projects).subscribe(definitions => {
        emitter.next(projects);
        this.getBuildsBatch(definitions).subscribe(builds => {
          this.supplyProjectsWithBuilds(projects, builds);
          emitter.next(projects);
          this.busyEmitter.next(false);
        });
      });
    });
  }

  supplyProjectsWithBuilds(projects: Array<FullProject>, buildGroups: Array<MainBuildsInfo[]>) {
    projects.forEach(project => {
      buildGroups.forEach(buildArray => {
        if (buildArray.length > 0 && buildArray[0].definition.project.id === project.project.id) {
          this.addBuildsOnFullProject(project, buildArray.sort((a, b) => {
          if (a.definition.name < b.definition.name)
            return -1;
          if (a.definition.name > b.definition.name)
            return 1;
          return 0;
        }));
        }
      });
    });
  }

  addBuildsOnFullProject(project: FullProject, builds: MainBuildsInfo[]) {
    project.builds = new Array<MainBuildsInfo>();
    builds.forEach(build => {
      project.builds.push(build);
    })
  }

  getBuildsBatch(buildsDefinitions: VstsBuildDefinition[][]): Observable<Array<MainBuildsInfo[]>> {
    let batch = new Array<Observable<MainBuildsInfo[]>>();
    buildsDefinitions.forEach(definitionGroup => {
      batch.push(this.getBuildsForDefinitionGroup(definitionGroup));
    });
    return Observable.forkJoin(batch);
  }

  getBuildsForDefinitionGroup(definitionGroup: VstsBuildDefinition[]): Observable<Array<MainBuildsInfo>> {
    let batch = new Array<Observable<MainBuildsInfo>>();
    definitionGroup.forEach(build => {
      batch.push(this.getBuildByDefinition(build));
    });
    return Observable.forkJoin(batch);
  }

  getBuildByDefinition(definition: VstsBuildDefinition): Observable<MainBuildsInfo> {
    return this.getLastBuildsForDefinition(definition, 10).map(builds => {
      let newBuild = new MainBuildsInfo(definition);
      newBuild.last = builds.filter(build => {
        //return build.reason === "schedule" || build.reason === "manual" || build.reason === "triggered" || build.re
        return build.reason !== "validateShelveset";
      }).sort((a, b) => {
        if (a.startTime > b.startTime)
          return -1;
        if (a.startTime < b.startTime)
          return 1;
        return 0;
      })[0];
      return newBuild;
    });
  }

  getDefinitionsBatch(projects: Array<FullProject>): Observable<Array<VstsBuildDefinition[]>> {
    let batch = new Array<Observable<VstsBuildDefinition[]>>();
    projects.forEach(project => {
      batch.push(this.getBuildDefinitionsForProject(project.project));
    });
    return Observable.forkJoin(batch);
  }

  getProjectsList(): Observable<Array<VstsProject>> {
    return this.launchGetForUrl(this.getProjectsApiUrl())
      .map((resp) => {
        let newValue = new VstsProjectList(resp.text());
        this.emitter.next(newValue);
        return newValue.value.sort((a, b) => {
          if (a.name < b.name)
            return -1;
          if (a.name > b.name)
            return 1;
          return 0;
        });
      });
  }

  getProjects(): Observable<VstsProjectList> {
    this.busyEmitter.next(true);
    return this.launchGetForUrl(this.getProjectsApiUrl())
      .map((resp) => {
        let newValue = new VstsProjectList(resp.text());
        this.emitter.next(newValue);
        return newValue;
      });
  }

  getBuildDefinitionsForProject(project: VstsProject): Observable<VstsBuildDefinition[]> {
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
        return list;
      });
  }

  getLastBuildsForDefinition(definition: VstsBuildDefinition, numberOfBuilds: number): Observable<VstsBuild[]> {
    //add queue system
    return this.launchGetForUrl(this.getTenLastBuildsUrl(definition, numberOfBuilds))
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

  getTenLastBuildsUrl(buildDefinition: VstsBuildDefinition, numberOfBuilds: number): string {
    return this.getProjectApisUrl(buildDefinition.project) + "build/builds?definitions=" + buildDefinition.id.toString() + "&statusFilter=completed&$top=" + numberOfBuilds.toString() + "&api-version=2.0";
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
