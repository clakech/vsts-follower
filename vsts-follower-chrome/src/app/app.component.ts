import { Component, OnInit } from '@angular/core';

import { VstsDataService } from './vsts/vsts-data.service';

@Component({
  selector: 'follow-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  title = 'Chrome Connector to ALM';
  isBusy = true;

  constructor(public vstsDataService: VstsDataService) { 
    
  }

  ngOnInit() {
    this.vstsDataService.isBusy.subscribe(newValue => {
      this.isBusy = newValue;
    });
  }
}
