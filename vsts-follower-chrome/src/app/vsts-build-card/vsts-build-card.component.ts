import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Component, Input, OnInit } from '@angular/core';
import { VstsBuild, VstsBuildDefinition } from '../vsts/vsts-project';

import { Observable } from 'rxjs/Observable';
import { VstsDataService } from '../vsts/vsts-data.service';

class QualityIndicator {
  public name: string;
  public value: string;
  public color: string;
}

@Component({
  selector: 'follow-vsts-build-card',
  templateUrl: './vsts-build-card.component.html',
  styleUrls: ['./vsts-build-card.component.css']
})
export class VstsBuildCardComponent implements OnInit {

  @Input() buildDefinition: VstsBuildDefinition = new VstsBuildDefinition();
  public indicators: Array<QualityIndicator> = new Array<QualityIndicator>();
  public lastBuild: VstsBuild = new VstsBuild();

  constructor(public vstsDataService: VstsDataService) { }

  ngOnInit() {
    this.chooseBuild();

    this.setSonarNullInformations();
  }

  chooseBuild() {
    this.vstsDataService.getTenLastBuildsForDefinition(this.buildDefinition).subscribe(builds => {
      this.lastBuild = this.getLastBuild(builds, 0);
    });
  }

  getLastBuild(builds: Array<VstsBuild>, index: number): VstsBuild {
    if (index >= builds.length) {
      return builds[0];
    }
    if (builds[index].reason === "schedule") {
      return builds[index];
    }
    if (builds[index].reason === "manual") {
      return builds[index];
    }
    if (builds[index].reason === "triggered") {
      return builds[index];
    }
    return this.getLastBuild(builds, index++);
  }

  getBuildColor(): string {
    let color: string;
    switch (this.lastBuild.result) {
      case "succeeded":
        color = "limegreen";
        break;
      case "partiallySucceeded":
        color = "goldenrod";
        break;
      case "failed":
        color = "crimson";
        break;
      default:
        color = "gainsboro";
        break;
    }
    return color;
  }

  getColorByNote(note: string) {
    let color: string;
    switch (note) {
      case "A":
        color = "limegreen";
        break;
      case "B":
        color = "lightgreen";
        break;
      case "C":
        color = "khaki";
        break;
      case "D":
        color = "goldenrod";
        break;
      case "E":
        color = "crimson";
        break;
      default:
        color = "gainsboro";
        break;
    }
    return color;
  }

  setSonarNullInformations() {
    this.indicators.push(
      <QualityIndicator>{
        name: "Reliability",
        value: "-",
        color: this.getColorByNote("-")
      }
    );
    this.indicators.push(
      <QualityIndicator>{
        name: "Security",
        value: "-",
        color: this.getColorByNote("-")
      }
    );
    this.indicators.push(
      <QualityIndicator>{
        name: "Maintainability",
        value: "-",
        color: this.getColorByNote("-")
      }
    );
    this.indicators.push(
      <QualityIndicator>{
        name: "Coverage",
        value: "-",
        color: this.getColorByNote("F")
      }
    );
  }
}
