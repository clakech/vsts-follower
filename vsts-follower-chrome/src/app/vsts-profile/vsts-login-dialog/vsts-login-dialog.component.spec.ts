import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule, MdDialog } from '@angular/material';
import 'hammerjs';


import { VstsLoginDialogComponent } from './vsts-login-dialog.component';
import { VstsProfileService } from '../vsts-profile.service';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [VstsLoginDialogComponent],
  imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
  entryComponents: [VstsLoginDialogComponent],
  exports: [VstsLoginDialogComponent],
})
class TestModule { }

describe('VstsLoginDialogComponent', () => {
  let component: VstsLoginDialogComponent;
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
      providers: [{provide: VstsProfileService, useClass: MockService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    dialog = TestBed.get(MdDialog);
    const dialogRef = dialog.open(VstsLoginDialogComponent);

    component = dialogRef.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load data on start', () => {
    const expected = {
      url: 'https://axafrance.visualstudio.com',
      login: 'user.name@axa.fr',
      token: 's1234567'
    };
    component.ngOnInit();
    expect(component.url).toBe(expected.url);
    expect(component.login).toBe(expected.login);
    expect(component.password).toBe(expected.token);
  });
});
