import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionToggleComponent } from './selection-toggle.component';

describe('SelectionToggleComponent', () => {
  let component: SelectionToggleComponent;
  let fixture: ComponentFixture<SelectionToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
