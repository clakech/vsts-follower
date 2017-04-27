import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BaseRequestOptions, ConnectionBackend, Http, RequestOptions } from '@angular/http';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Response, ResponseOptions } from '@angular/http';
import { VstsProject, VstsProjectList } from './vsts-project';
import { async, fakeAsync, tick } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { ProfileCredentials } from '../profile/profile-credentials';
import { ProfileService } from '../profile/profile.service';
import { VstsDataService } from './vsts-data.service';

/**
 * Mock of VstsProfileService
 *
 * @class MockService
 */
class MockService {

  public getProfile(): ProfileCredentials {
    let result = new ProfileCredentials();
    result.login = "benoit.a.fontaine@axa.fr";
    result.password = "yc4d4cakkcarvdtojg6mcem7zqauqgeeflxiggb26feqvoakrs3q___";
    result.url = "https://axafrance.visualstudio.com";
    return result;
  }

  public setProfile(data: ProfileCredentials) {
    return true;
  }
}

describe('VstsDataService', () => {

  beforeEach(() => {
    this.injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      { provide: ProfileService, useClass: MockService },
      VstsDataService
    ]);
    this.vstsDataService = this.injector.get(VstsDataService);
    this.backend = this.injector.get(ConnectionBackend) as MockBackend;
    this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
  });

  xit('should get projects list', (done) => {
    let result: VstsProjectList;

    console.log(this.vstsDataService);
    this.vstsDataService.getProjects().subscribe(value => {
      result = value;
      expect(result.count).toEqual(10, 'should contain given amount of projects');
      done();
    });

    this.lastConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ count: 10, value: [] })
    })));
  });

  xit('should get projects list return empty if error', () => {
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
