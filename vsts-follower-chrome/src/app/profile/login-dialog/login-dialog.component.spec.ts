import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule, MdDialog } from '@angular/material';
import 'hammerjs';


import { LoginDialogComponent } from './login-dialog.component';
import { ProfileService } from '../profile.service';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
  entryComponents: [LoginDialogComponent],
  exports: [LoginDialogComponent],
})
class TestModule { }

describe('VstsLoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let dialog: MdDialog;

  const SERVICE_OBJECT = {
      url: 'https://axafrance.visualstudio.com',
      login: 'user.name@axa.fr',
      token: 's1234567'
    };

  /**
   * Mock of VstsProfileService
   *
   * @class MockService
   */
  class MockService {

    public getVstsProfile() {
      return SERVICE_OBJECT;
    }

    public setVstsProfile(data: any) {
      return true;
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, MdDialogModule],
      providers: [{provide: ProfileService, useClass: MockService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    const dialogRef = dialog.open(LoginDialogComponent);
    spyOn(dialogRef, 'close');

    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load data on start', () => {
    const service = TestBed.get(ProfileService);
    spyOn(service, 'getVstsProfile').and.callThrough();
    const expected = {
      url: 'https://axafrance.visualstudio.com',
      login: 'user.name@axa.fr',
      token: 's1234567'
    };
    component.ngOnInit();

    expect(component.url).toBe(expected.url);
    expect(component.login).toBe(expected.login);
    expect(component.password).toBe(expected.token);
    expect(service.getVstsProfile).toHaveBeenCalled();
  });

  it('Should call save when launch validation action', () => {
    const service = TestBed.get(ProfileService);
    spyOn(service, 'setVstsProfile');
    const expected = {
      url: 'https://company.visualstudio.com',
      login: 'uname@company.fr',
      token: 'pass'
    };
    component.ngOnInit();
    component.url = expected.url;
    component.login = expected.login;
    component.password = expected.token;

    component.saveData();

    expect(service.setVstsProfile).toHaveBeenCalled();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

});
