import { Injectable } from '@angular/core';
import { } from './vsts-credentials';;
import { VstsCredentials } from 'app/vsts-credentials';

@Injectable()
export class VstsProfileService {

  public storageName = 'vstsProfile';

  private config;

  public getVstsProfile(): VstsCredentials {
    const dataStr = localStorage.getItem(this.storageName);
    this.config =  JSON.parse(dataStr);
    return this.config;
  }

  public setVstsProfile(data: VstsCredentials) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
    return (this.getVstsProfile() != null);
  }

  constructor() { }

}
