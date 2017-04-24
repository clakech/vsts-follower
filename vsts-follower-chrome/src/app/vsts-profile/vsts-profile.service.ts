import { } from './vsts-credentials';

import { Injectable } from '@angular/core';
import { VstsCredentials } from 'app/vsts-credentials';

@Injectable()
export class VstsProfileService {

  public storageName = 'vstsProfile';

  private config;

  public getVstsProfile(): VstsCredentials {
    const dataStr = localStorage.getItem(this.storageName);
    return <VstsCredentials>  JSON.parse(dataStr);
  }

  public setVstsProfile(data: VstsCredentials) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
    return (this.getVstsProfile() != null);
  }

  constructor() { }

}
