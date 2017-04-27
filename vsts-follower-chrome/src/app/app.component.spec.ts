import 'hammerjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { TestBed, async } from '@angular/core/testing';
import { VstsProject, VstsProjectList } from './vsts/vsts-project';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ProfileCredentials } from './profile/profile-credentials';
import { ProfileModule } from './profile/profile.module';
import { ProfileService } from './profile/profile.service';
import { RouterTestingModule } from '@angular/router/testing';
import { VstsDataService } from './vsts/vsts-data.service';

/**
 * Mock of VstsProfileService
 *
 * @class MockService
 */
class MockService {

  public getVstsProfile(): ProfileCredentials {
    let result = new ProfileCredentials();
    result.login = "benoit.a.fontaine@axa.fr";
    result.password = "yc4d4cakkcarvdtojg6mcem7zqauqgeeflxiggb26feqvoakrs3q___";
    result.url = "https://axafrance.visualstudio.com";
    return result;
  }

  public setVstsProfile(data: ProfileCredentials) {
    return true;
  }
}

class MockVstsDataService {
  getProjects(): Observable<VstsProjectList> {
    return Observable.create(observer => {
        observer.next(new VstsProjectList("{\"count\":1,\"value\":[]"));
    });
  }
}

describe('AppComponent', () => {
  const expectedTitle = 'Chrome Connector to ALM';
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        FormsModule,
        ProfileModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: VstsDataService, useClass: MockVstsDataService }, 
        { provide: ProfileService, useClass: MockService }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'follow works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(expectedTitle);
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-toolbar').textContent).toContain(expectedTitle);
  }));
});
