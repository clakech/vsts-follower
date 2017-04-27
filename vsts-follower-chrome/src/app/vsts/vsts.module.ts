import { HttpModule, JsonpModule } from '@angular/http';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VstsDataService } from './vsts-data.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    VstsDataService
  ],
  declarations: []
})
export class VstsModule { }
