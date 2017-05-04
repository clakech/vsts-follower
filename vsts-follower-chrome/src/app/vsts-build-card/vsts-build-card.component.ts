import { Component, Input, OnInit } from '@angular/core';

import { VstsBuildDefinition } from '../vsts/vsts-project';

@Component({
  selector: 'follow-vsts-build-card',
  templateUrl: './vsts-build-card.component.html',
  styleUrls: ['./vsts-build-card.component.css']
})
export class VstsBuildCardComponent implements OnInit {

  @Input() buildDefinition: VstsBuildDefinition;

  constructor() { }

  ngOnInit() {
  }

}
