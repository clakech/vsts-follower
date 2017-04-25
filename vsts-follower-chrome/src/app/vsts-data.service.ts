import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { VstsProject, VstsProjectList } from './vsts-project';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VstsCredentials } from './vsts-credentials';
import { VstsProfileService } from './vsts-profile/vsts-profile.service';

@Injectable()
export class VstsDataService {

  private projectListSuffix: string = "/defaultcollection/_apis/projects?api-version=2.0";
  private requestOptions: RequestOptions;
  private profile: VstsCredentials;

  constructor(public profileService: VstsProfileService, private http: Http) {

  }

  getProjects(): Observable<VstsProjectList> {
    this.profile = this.profileService.getVstsProfile();
    if (this.profile) {
      let basic: string = 'Basic ' + btoa(this.profile.login.toLowerCase() + ':' + this.profile.token);
      let headers = new Headers({ 'Authorization': basic });
      this.requestOptions = new RequestOptions({ headers: headers });
    }
    return this.http.get(this.profile.url + this.projectListSuffix, this.requestOptions)
      .map((resp) => {
        return new VstsProjectList(resp.text());
      })
      .catch((errorResp) => {
        console.log(errorResp.text());
        return null;
      });
  }

}
