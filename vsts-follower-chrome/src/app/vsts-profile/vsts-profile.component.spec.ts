import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VstsProfileComponent } from './vsts-profile.component';
import { VstsProfileService } from './vsts-profile.service';
import { VstsProject, VstsProjectList } from '../vsts-project';
import { VstsDataService } from '../vsts-data.service';
import { VstsLoginDialogComponent } from './vsts-login-dialog/vsts-login-dialog.component';
import { MaterialModule, MdDialog } from '@angular/material';
import 'hammerjs';
import { NgModule } from '@angular/core';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VstsCredentials } from '../vsts-credentials';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@NgModule({
  declarations: [VstsLoginDialogComponent],
  imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
  entryComponents: [VstsLoginDialogComponent],
  exports: [VstsLoginDialogComponent],
  providers: []
})
class TestModule { }

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

describe('VstsProfileComponent', () => {
  let component: VstsProfileComponent;
  let fixture: ComponentFixture<VstsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VstsProfileComponent],
      imports: [MaterialModule, FormsModule, TestModule],
      providers: [
        { provide: VstsDataService, useClass: MockVstsDataService }, 
        { provide: VstsProfileService, useClass: MockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and have default label', () => {
    expect(component).toBeTruthy();
    expect(component.buttonLabel).toBe('Connect VSTS');
  });

  it('should render default button label', async(() => {
    const fixture = TestBed.createComponent(VstsProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Connect VSTS');
  }));


  it('should render good button label on init with correct profile', async(() => {
    const fixture = TestBed.createComponent(VstsProfileComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;

    //WHEN
    component.ngOnInit();

    expect(component.buttonLabel).toBe('Connected (1 prj)');
    expect(compiled.querySelector('button').textContent).toContain('Connected (1 prj)');
  }));

  it('should openDialog', () => {
    expect(component).toBeTruthy();
    expect(component.openDialog()).not.toBeNull();
  });
});
