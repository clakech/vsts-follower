import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VstsProfileComponent } from './vsts-profile.component';
import { ProfileService } from '../profile.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { MaterialModule, MdDialog } from '@angular/material';
import 'hammerjs';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
  entryComponents: [LoginDialogComponent],
  exports: [LoginDialogComponent],
  providers: [ProfileService]
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

  it('should openDialog', () => {
    expect(component).toBeTruthy();
    expect(component.openDialog()).not.toBeNull();
  });
});
