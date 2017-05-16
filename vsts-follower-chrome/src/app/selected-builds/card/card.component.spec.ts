import 'hammerjs';

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MaterialModule, MdDialog } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardComponent } from './card.component';
import { FormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [],
  imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
  entryComponents: [],
  exports: [],
  providers: []
})
class TestModule { }


describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardComponent ],
      imports: [TestModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
