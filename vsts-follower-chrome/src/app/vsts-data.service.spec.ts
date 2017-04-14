import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { Injectable, ReflectiveInjector } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { VstsCredentials } from './vsts-credentials';
import { VstsDataService } from './vsts-data.service';
import { VstsProfileService } from './vsts-profile/vsts-profile.service';
import { VstsProject, VstsProjectList } from './vsts-project';

/**
 * Mock of VstsProfileService
 *
 * @class MockService
 */
class MockService {

  public getVstsProfile(): VstsCredentials {
    let result = new VstsCredentials();
    result.login = "benoit.a.fontaine@axa.fr";
    result.token = "yc4d4cakkcarvdtojg6mcem7zqauqgeeflxiggb26feqvoakrs3q___";
    result.url = "https://axafrance.visualstudio.com";
    return result;
  }

  public setVstsProfile(data: VstsCredentials) {
    return true;
  }
}

describe('VstsDataService', () => {

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      VstsDataService,
      { provide: VstsProfileService, useClass: MockService }
    ]);
    this.vstsDataService = this.injector.get(VstsDataService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  it('should get projects list', () => {
    let result: VstsProjectList;
    this.vstsDataService.getProjects().subscribe(
      value => result = value
    );


    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ count: 10, value: [] })
    })));

    expect(result.count).toEqual(10, 'should contain given amount of projects');
  });

  it('should get projects list return empty if error', () => {
    let result: VstsProjectList;
    this.vstsDataService.getProjects().subscribe(
      value => result = value
    );

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      status: 404,
      statusText: 'URL not found'
    })));

    expect(result.count).toEqual(0, 'should contain no project');
  });
});
