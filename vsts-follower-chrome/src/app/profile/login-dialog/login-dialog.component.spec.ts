import { MaterialModule, MdDialogModule, MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';

import { LoginDialogComponent } from './login-dialog.component';
import { ProfileService } from '../profile.service';

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
  providers: [ProfileService],
  entryComponents: [LoginDialogComponent],
  exports: [LoginDialogComponent],
})
class TestModule { }

describe('LoginDialogComponent', () => {
  let component: LoginDialogComponent;
  let dialog: MdDialog;

  const SERVICE_OBJECT = {
      url: 'https://axafrance.visualstudio.com',
      login: 'user.name@axa.fr',
      token: 's1234567'
    };

    describe("angular test injection", () => {

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [MaterialModule, FormsModule, TestModule],

        })
        .compileComponents();
      }));

      beforeEach(() => {
        dialog = TestBed.get(MdDialog);
        const dialogRef = dialog.open(LoginDialogComponent);
        spyOn(dialogRef, 'close');

        component = dialogRef.componentInstance;
      });

      it('should create and have default label', () => {
        expect(component).toBeTruthy();
      });
    });
    describe("unit testing", () => {
      let profileService: ProfileService;
      let dialogRef: MdDialogRef<LoginDialogComponent>;

      beforeEach(() => {
        dialogRef = jasmine.createSpyObj("MdDialogRef", ['close']);
        profileService = jasmine.createSpyObj("ProfileService", ['getProfile', 'setProfile']);
        component = new LoginDialogComponent(dialogRef, profileService, {});
      });

      it('Should load data on start', () => {
        const expected = {
          url: 'https://axafrance.visualstudio.com',
          login: 'user.name@axa.fr',
          password: 's1234567'
        };
        (<jasmine.Spy> profileService.getProfile).and.callFake(() => expected);
        component.ngOnInit();

        expect(component.url).toBe(expected.url);
        expect(component.login).toBe(expected.login);
        expect(component.password).toBe(expected.password);
        expect(profileService.getProfile).toHaveBeenCalled();
      });

      it('Should call save when launch validation action', () => {
        const expected = {
          url: 'https://company.visualstudio.com',
          login: 'uname@company.fr',
          password: 'pass'
        };
        (<jasmine.Spy> profileService.getProfile).and.callFake(() => expected);
        component.ngOnInit();
        component.url = expected.url;
        component.login = expected.login;
        component.password = expected.password;

        component.saveData();

        expect(profileService.setProfile).toHaveBeenCalled();
        expect(dialogRef.close).toHaveBeenCalled();
      });
    });
});
