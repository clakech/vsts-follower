import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ConnectionBackend, Http, HttpModule, JsonpModule, RequestOptionsArgs, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import {async, fakeAsync, tick} from '@angular/core/testing';

import {NgModule} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VstsCredentials } from './vsts-credentials';
import { VstsDataService } from './vsts-data.service';
import { VstsProfileService } from './vsts-profile/vsts-profile.service';

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


class MockHttp {
  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return Observable.create((observer: any) => {
      observer.onNext(new ResponseOptions({
        body: JSON.stringify({ count: 10, value: [] })
      }));
      observer.onCompleted();

      // Any cleanup logic might go here
      return function () {
        console.log('disposed');
      }
    });
  }
}

describe('VstsDataService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [    
        HttpModule,
        JsonpModule
      ],
      providers: [
        VstsDataService,
        {provide: VstsProfileService, useClass: MockService},
        {provide: Http, useClass: MockHttp}
        ]
    });
  });
/*
  it('should get projects list', inject([VstsDataService], (service: VstsDataService, http: Http) => {
    expect(service).toBeTruthy();
    expect(service.profileService).toBeTruthy();
    spyOn(http, "get").and.callFake(() => {
      return Observable.create((observer: any) => {
      observer.onNext(new ResponseOptions({
        body: JSON.stringify({ count: 10, value: [] })
      }));
      observer.onCompleted();

      // Any cleanup logic might go here
      return function () {
        console.log('disposed');
      }
    });
    });
    service.getProjects().subscribe(list => {
      expect(list.count).toBe(10);
    });

  }));

  it('should return null if exception on get project list', inject([VstsDataService], (service: VstsDataService, http: Http) => {
    expect(service).toBeTruthy();
    expect(service.profileService).toBeTruthy();

    service.getProjects().subscribe(list => {
      expect(list).toBeNull();
    });

  }));
  */

});
