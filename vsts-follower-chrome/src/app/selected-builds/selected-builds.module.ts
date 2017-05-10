import 'hammerjs';

import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { SelectedBuildsService } from './selected-builds.service';
import { SelectionToggleComponent } from './selection-toggle/selection-toggle.component';
import { TileComponent } from './tile/tile.component';
import { IndicatorTileComponent } from './indicator-tile/indicator-tile.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ListComponent, CardComponent, SelectionToggleComponent, TileComponent, IndicatorTileComponent],
  exports: [ListComponent],
  providers: [SelectedBuildsService]
})
export class SelectedBuildsModule { }
