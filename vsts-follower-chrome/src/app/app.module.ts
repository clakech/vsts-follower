import 'hammerjs';

import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ProfileModule } from './profile/profile.module';
import { VstsModule } from './vsts/vsts.module';
import { VstsProjectsComponent } from './vsts-projects/vsts-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    VstsProjectsComponent
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
    VstsModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
