import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstsProjectComponent } from './vsts-project.component';

describe('VstsProjectComponent', () => {
  let component: VstsProjectComponent;
  let fixture: ComponentFixture<VstsProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstsProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
