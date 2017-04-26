import { } from './vsts-credentials';

import { Injectable } from '@angular/core';
import { ProfileCredentials } from 'app/profile/profile-credentials';

@Injectable()
export class VstsProfileService {

  public storageName = 'vstsProfile';

  private config;

  public getVstsProfile(): ProfileCredentials {
    const dataStr = localStorage.getItem(this.storageName);
    return <ProfileCredentials> JSON.parse(dataStr);
  }

  public setVstsProfile(data: ProfileCredentials) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
    return (this.getVstsProfile() != null);
  }

  constructor() { }

}
