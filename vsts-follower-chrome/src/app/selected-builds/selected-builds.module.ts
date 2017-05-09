import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { SelectedBuildsService } from './selected-builds.service';
import { SelectionToggleComponent } from './selection-toggle/selection-toggle.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponent, CardComponent, SelectionToggleComponent],
  exports: [ListComponent],
  providers: [SelectedBuildsService]
})
export class SelectedBuildsModule { }
