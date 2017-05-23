import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityIndicatorComponent } from './quality-indicator.component';

describe('QualityIndicatorComponent', () => {
  let component: QualityIndicatorComponent;
  let fixture: ComponentFixture<QualityIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
