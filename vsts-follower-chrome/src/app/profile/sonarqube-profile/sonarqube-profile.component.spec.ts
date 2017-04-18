import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonarqubeProfileComponent } from './sonarqube-profile.component';

describe('SonarqubeProfileComponent', () => {
  let component: SonarqubeProfileComponent;
  let fixture: ComponentFixture<SonarqubeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonarqubeProfileComponent ]
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
