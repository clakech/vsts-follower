import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstsProfileComponent } from './vsts-profile.component';
import { VstsLoginDialogComponent } from './vsts-login-dialog/vsts-login-dialog.component';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

describe('VstsProfileComponent', () => {
  let component: VstsProfileComponent;
  let fixture: ComponentFixture<VstsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstsProfileComponent, VstsLoginDialogComponent ],
      imports: [MaterialModule]
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
});
