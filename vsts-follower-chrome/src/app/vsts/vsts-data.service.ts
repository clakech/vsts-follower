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

  constructor(public profileService: ProfileService, private http: Http) {
    this.profile = this.profileService.getProfile("vsts");
    let basic: string = 'Basic ' + this.profile.getBasic();
    let headers = new Headers({ 'Authorization': basic });
    this.requestOptions = new RequestOptions({ headers: headers });
  }

  getProjects(): Observable<VstsProjectList> {
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
