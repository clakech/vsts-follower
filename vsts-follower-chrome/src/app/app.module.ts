import 'hammerjs';

import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { OrderByPipe } from './order-by.pipe';
import { ProfileModule } from './profile/profile.module';
import { QualityIndicatorComponent } from './quality-indicator/quality-indicator.component';
import { SelectedBuildsModule } from './selected-builds/selected-builds.module';
import { SonarModule } from './sonar/sonar.module';
import { VstsBuildCardComponent } from './vsts-build-card/vsts-build-card.component';
import { VstsModule } from './vsts/vsts.module';
import { VstsProjectComponent } from './vsts-project/vsts-project.component';
import { VstsProjectsComponent } from './vsts-projects/vsts-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    VstsProjectsComponent,
    VstsBuildCardComponent,
    VstsProjectComponent,
    QualityIndicatorComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ProfileModule,
    VstsModule,
    SelectedBuildsModule,
    SonarModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
