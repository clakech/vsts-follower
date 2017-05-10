import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'follow-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Input() colspan: number = 1;
  @Input() rowspan: number = 1;
  @Input() backgroundColor: string;
  @Input() title: string = "";
  
  constructor() { }

  ngOnInit() {
  }

}
