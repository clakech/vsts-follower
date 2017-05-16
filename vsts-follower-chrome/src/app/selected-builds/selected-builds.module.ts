import 'hammerjs';

import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { IndicatorTileComponent } from './indicator-tile/indicator-tile.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { SelectedBuildsService } from './selected-builds.service';
import { SelectionToggleComponent } from './selection-toggle/selection-toggle.component';
import { SonarModule } from '../sonar/sonar.module';
import { TileComponent } from './tile/tile.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SonarModule
  ],
  declarations: [ListComponent, CardComponent, SelectionToggleComponent, TileComponent, IndicatorTileComponent],
  exports: [ListComponent],
  providers: [SelectedBuildsService]
})
export class SelectedBuildsModule { }
