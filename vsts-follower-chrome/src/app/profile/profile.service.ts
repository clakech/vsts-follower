import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfileCredentials } from './profile-credentials';
import { Subscriber } from 'rxjs/Subscriber';

export type ProfileType = "sonarqube" | "vsts" | "";

@Injectable()
export class ProfileService {
  private config;
  public profilesInitiated: Observable<Array<string>>;
  private profilesInitiatedSub: Subscriber<Array<string>> = new Subscriber<Array<string>>();
  private profilesGetted: Array<string>;
  

  public getProfile(profile: ProfileType = ""): ProfileCredentials {
    const dataStr = localStorage.getItem(this.getStorageName(profile));
    this.config =  JSON.parse(dataStr);
    if (this.config && !this.profilesGetted.find(elem => elem === profile)) {
      this.profilesGetted.push(profile);
      this.profilesInitiatedSub.next(this.profilesGetted);
    }
    return this.config;
  }

  public setProfile(profile: ProfileType = "", data: ProfileCredentials) {
    localStorage.setItem(this.getStorageName(profile), JSON.stringify(data));
    return (this.getProfile(profile) != null);
  }

  public getStorageName(profile) {
    return `${profile}Profile`;
  }

  constructor() { 
    this.profilesInitiated  = new Observable<Array<string>>(sub => this.profilesInitiatedSub = sub);
    this.profilesGetted = new Array<string>();
  }

}
