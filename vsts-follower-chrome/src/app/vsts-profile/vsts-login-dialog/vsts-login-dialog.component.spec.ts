import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDialogModule, MdDialog } from '@angular/material';
import 'hammerjs';


import { VstsLoginDialogComponent } from './vsts-login-dialog.component';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [VstsLoginDialogComponent],
  imports: [MaterialModule, FormsModule],
  entryComponents: [VstsLoginDialogComponent],
  exports: [VstsLoginDialogComponent],
})
class TestModule { }

describe('VstsLoginDialogComponent', () => {
  let component: VstsLoginDialogComponent;
  let dialog: MdDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, MdDialogModule]
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
});
