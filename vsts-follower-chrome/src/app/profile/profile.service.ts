import { Injectable } from '@angular/core';
import { ProfileCredentials } from './profile-credentials';

export type ProfileType = "sonarqube" | "vsts" | "";

@Injectable()
export class ProfileService {
  private config;

  public getProfile(profile: ProfileType = ""): ProfileCredentials {
    const dataStr = localStorage.getItem(this.getStorageName(profile));
    this.config =  JSON.parse(dataStr);
    return this.config;
  }

  public setProfile(profile: ProfileType = "", data: ProfileCredentials) {
    localStorage.setItem(this.getStorageName(profile), JSON.stringify(data));
    return (this.getProfile(profile) != null);
  }

  public getStorageName(profile) {
    return `${profile}Profile`;
  }

  constructor() { }

}
