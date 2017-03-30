import { Injectable } from '@angular/core';

@Injectable()
export class VstsProfileService {

  private config = {
    url: '',
    login: '',
    token: ''
  };

  public getVstsProfile() {
    return this.config;
  }

  constructor() { }

}
