import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VstsBuildCardComponent } from './vsts-build-card.component';

describe('VstsBuildCardComponent', () => {
  let component: VstsBuildCardComponent;
  let fixture: ComponentFixture<VstsBuildCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VstsBuildCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VstsBuildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
