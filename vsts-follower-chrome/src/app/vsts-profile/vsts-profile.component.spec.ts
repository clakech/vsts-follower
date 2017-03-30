import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { VstsProfileComponent } from './vsts-profile.component';
import { VstsLoginDialogComponent } from './vsts-login-dialog/vsts-login-dialog.component';
import { MaterialModule, MdDialog } from '@angular/material';
import 'hammerjs';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [VstsLoginDialogComponent],
  imports: [MaterialModule, FormsModule],
  entryComponents: [VstsLoginDialogComponent],
  exports: [VstsLoginDialogComponent],
})
class TestModule { }

describe('VstsProfileComponent', () => {
  let component: VstsProfileComponent;
  let fixture: ComponentFixture<VstsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstsProfileComponent ],
      imports: [MaterialModule, FormsModule, TestModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openDialog', () => {
    expect(component).toBeTruthy();
    expect(component.openDialog()).not.toBeNull();
    /*expect(component.currentDomain.login).not.toBeNull();
    expect(component.currentDomain.token).not.toBeNull();
    expect(component.currentDomain.url).not.toBeNull();*/
  });
});
