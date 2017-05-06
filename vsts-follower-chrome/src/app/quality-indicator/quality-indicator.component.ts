import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'follow-quality-indicator',
  templateUrl: './quality-indicator.component.html',
  styleUrls: ['./quality-indicator.component.css']
})
export class QualityIndicatorComponent implements OnInit {
  @Input() indicatorName: string;
  @Input() indicatorValue: string;
  
  constructor() { }

  ngOnInit() {
  }

}
