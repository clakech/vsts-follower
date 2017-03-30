import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { VstsLoginDialogComponent } from './vsts-login-dialog.component';

describe('VstsLoginDialogComponent', () => {
  let component: VstsLoginDialogComponent;
  let fixture: ComponentFixture<VstsLoginDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstsLoginDialogComponent ],
      imports: [MaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstsLoginDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
