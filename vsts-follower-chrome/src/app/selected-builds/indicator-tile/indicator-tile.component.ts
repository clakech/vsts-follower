import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'follow-indicator-tile',
  templateUrl: './indicator-tile.component.html',
  styleUrls: ['./indicator-tile.component.css']
})
export class IndicatorTileComponent  implements OnInit {
  @Input() indicatorName: string;
  @Input() indicatorValue: string;
  @Input() indicatorColor: string;
  @Input() indicatorType: string;
  constructor() {
   }


  ngOnInit() {
  }

  getPercentClass(value){
    return "p"+value;
  }
}
