import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { VstsProfileComponent } from './vsts-profile/vsts-profile.component';
import { VstsLoginDialogComponent } from './vsts-profile/vsts-login-dialog/vsts-login-dialog.component';

import { VstsDataService } from './vsts-data.service';
import { VstsProfileService } from './vsts-profile/vsts-profile.service';
import { Observable } from 'rxjs/Observable';
import { VstsCredentials } from './vsts-credentials';
import { VstsProject, VstsProjectList } from './vsts-project';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

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
        FormsModule
      ],
      declarations: [
        AppComponent,
        VstsProfileComponent,
        VstsLoginDialogComponent
      ],
      providers: [
        { provide: VstsDataService, useClass: MockVstsDataService }, 
        { provide: VstsProfileService, useClass: MockService }
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
