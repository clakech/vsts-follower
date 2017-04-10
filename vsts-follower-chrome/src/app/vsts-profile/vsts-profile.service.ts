import { Injectable } from '@angular/core';

@Injectable()
export class VstsProfileService {

  public storageName = 'vstsProfile';

  private config;

  public getVstsProfile() {
    const dataStr = localStorage.getItem(this.storageName);
    this.config =  JSON.parse(dataStr);
    return this.config;
  }

  public setVstsProfile(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
    return (this.getVstsProfile() != null);
  }

  constructor() { }

}
