import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@angular/material';

import { VstsProfileComponent } from './vsts-profile/vsts-profile.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { ProfileService } from './profile.service';
import { SonarqubeProfileComponent } from './sonarqube-profile/sonarqube-profile.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    VstsProfileComponent,
    SonarqubeProfileComponent,
    LoginDialogComponent
  ],
  providers: [
    ProfileService
  ],
  exports: [
    VstsProfileComponent,
    SonarqubeProfileComponent
  ],
  entryComponents: [
    LoginDialogComponent
  ]
})
export class ProfileModule { }
