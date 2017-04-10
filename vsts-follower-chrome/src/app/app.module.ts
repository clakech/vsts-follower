import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VstsProfileComponent } from './vsts-profile/vsts-profile.component';
import { VstsLoginDialogComponent } from './vsts-profile/vsts-login-dialog/vsts-login-dialog.component';
import { VstsProfileService } from './vsts-profile/vsts-profile.service';

@NgModule({
  declarations: [
    AppComponent,
    VstsProfileComponent,
    VstsLoginDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    VstsProfileService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    VstsLoginDialogComponent
  ]
})
export class AppModule { }
