import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { BuildInfo, Coverage, TestResult } from '../test-result';
import { Component, Input, OnInit } from '@angular/core';
import { MainBuildsInfo, VstsBuild, VstsBuildDefinition } from '../vsts/vsts-project';

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

  @Input() build: MainBuildsInfo = new MainBuildsInfo(new VstsBuildDefinition());
  public indicators: Array<QualityIndicator> = new Array<QualityIndicator>();
  public calculatedCoverages: Array<string> = new Array<string>();
  public testColor: string;
  public testResult: TestResult = new TestResult();

  constructor(public vstsDataService: VstsDataService) { }

  ngOnInit() {
    this.setSonarNullInformations();
    //this.testColor = this.getDefaultColor();

    if (this.build.last) {
      this.vstsDataService.getTestResultForBuild(this.build).subscribe(result => {
        this.build.testResult = result;
        this.testResult = result;
        this.testColor = this.getTestColor();
        if (this.build.testResult.totalTests > 0) {
          this.vstsDataService.getTestCoverageForBuild(this.build).subscribe(coverages => {
            this.build.testResult.coverageStats = coverages;
            this.testResult.coverageStats = coverages;
            coverages.forEach(stat => {
              let cov = Math.round((stat.covered / stat.total) * 100);
              if (this.build.testResult.failedTests === 0 && cov < 80) {
                this.testColor = "goldenrod";
              }
              this.calculatedCoverages.push(stat.label + " : " + cov.toString() + " %");
            });
          });
        }
      });
    }
  }

  getTestColor() {
    if (!this.build) {
      return this.getDefaultColor();
    }
    if (!this.build.testResult) {
      return this.getDefaultColor();
    }
    if (this.build.testResult.totalTests == 0) {
      return this.getDefaultColor();
    }
    if (this.build.testResult.failedTests > 0) {
      return "crimson";
    }
    if (this.build.testResult.ignoredTests > 0) {
      return "goldenrod";
    }



    return "limegreen";
  }

  getDefaultColor() {
    return "gainsboro";
  }

  getBuildColor(): string {
    let color: string;
    switch (this.build.last.result) {
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
