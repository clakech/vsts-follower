import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { VstsProject, VstsProjectList } from './vsts-project';

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

  constructor(public profileService: ProfileService, private http: Http) {
    this.projects = new Observable<VstsProjectList>(e => this.emitter = e);
  }

  getProjects(): Observable<VstsProjectList> {
    this.profile = this.profileService.getProfile("vsts");
    if (this.profile) {
      let basic: string = 'Basic ' + btoa(this.profile.login.toLowerCase() + ':' + this.profile.password);
      let headers = new Headers({ 'Authorization': basic });
      this.requestOptions = new RequestOptions({ headers: headers });
    }
    return this.http.get(this.profile.url + this.projectListSuffix, this.requestOptions)
      .map((resp) => {
        let newValue = new VstsProjectList(resp.text());
        this.emitter.next(newValue);
        return newValue;
      });
  }

}
