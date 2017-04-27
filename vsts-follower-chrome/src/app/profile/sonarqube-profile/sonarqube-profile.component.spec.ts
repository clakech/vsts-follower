import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialog } from '@angular/material';
import 'hammerjs';
import {NgModule} from '@angular/core';

import { ProfileService } from '../profile.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { SonarqubeProfileComponent } from './sonarqube-profile.component';

@NgModule({
  declarations: [LoginDialogComponent],
  imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
  entryComponents: [LoginDialogComponent],
  exports: [LoginDialogComponent],
  providers: [ProfileService]
})
class TestModule { }

describe('SonarqubeProfileComponent', () => {
  let component: SonarqubeProfileComponent;
  let fixture: ComponentFixture<SonarqubeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonarqubeProfileComponent ],
      imports: [MaterialModule, FormsModule, TestModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonarqubeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openDialog', () => {
    expect(component.openDialog).toBeDefined();
  });
});
