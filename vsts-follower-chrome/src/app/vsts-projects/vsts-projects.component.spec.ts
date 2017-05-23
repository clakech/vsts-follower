import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstsProjectsComponent } from './vsts-projects.component';

describe('VstsProjectsComponent', () => {
  let component: VstsProjectsComponent;
  let fixture: ComponentFixture<VstsProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstsProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
