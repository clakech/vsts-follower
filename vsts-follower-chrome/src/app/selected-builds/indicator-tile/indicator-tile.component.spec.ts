import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorTileComponent } from './indicator-tile.component';

describe('IndicatorTileComponent', () => {
  let component: IndicatorTileComponent;
  let fixture: ComponentFixture<IndicatorTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
