import 'hammerjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MaterialModule, MdDialog } from '@angular/material';
import { VstsProject, VstsProjectList } from '../../vsts/vsts-project';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfileCredentials } from '../profile-credentials';
import { ProfileService } from '../profile.service';
import { VstsDataService } from '../../vsts/vsts-data.service';
import { VstsProfileComponent } from './vsts-profile.component';

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
  entryComponents: [LoginDialogComponent],
  exports: [LoginDialogComponent],
  providers: [ProfileService]
})
class TestModule { }

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
  public projects: Observable<VstsProjectList> = new Observable<VstsProjectList>(e => this.emitter = e);
  public emitter: any;
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
        { provide: ProfileService, useClass: MockService }
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


  xit('should render good button label on init with correct profile', async(() => {
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
