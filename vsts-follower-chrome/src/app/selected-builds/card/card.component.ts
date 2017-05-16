import { Component, Input, OnInit } from '@angular/core';
import { MainBuildsInfo, VstsBuild, VstsBuildDefinition, VstsProject } from '../../vsts/vsts-project';

class QualityIndicator {
  public name: string;
  public value: string;
  public color: string;

  constructor(name?: string, value?: string, color?: string) {
    this.name = name;
    this.value = value;
    this.color = color;
  }
}

@Component({
  selector: 'follow-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() build: MainBuildsInfo = new MainBuildsInfo(new VstsBuildDefinition());
  public indicators: Array<QualityIndicator> = new Array<QualityIndicator>();

  constructor() { }

  ngOnInit() {
    //console.log(this.build);
    this.setBuildIndicators();
    this.setSonarNullInformations();
  }

  setBuildIndicators() {
    if (this.build.testResult && this.build.testResult.totalTests > 0) {
      this.indicators.push(
          new QualityIndicator(
            "Total Tests",
            this.build.testResult.totalTests.toString(),
            "gainsboro"
          ));
      if (this.build.testResult.failedTests > 0) {
        this.indicators.push(
          new QualityIndicator(
            "Failed Tests",
            this.build.testResult.failedTests.toString(),
            "crimson"
          ));
      }
      if (this.build.testResult.ignoredTests > 0) {
        this.indicators.push(
          new QualityIndicator(
            "Ignored Tests",
            this.build.testResult.ignoredTests.toString(),
            "goldenrod"
          ));
      }
      if (this.build.testResult.coverageStats && this.build.testResult.coverageStats.length > 0) {
        this.build.testResult.coverageStats.forEach(stat => {
          let cov = Math.round((stat.covered / stat.total) * 100);
          let color = "gainsboro";
          if (cov >= 99) {
            color= "limegreen";
          } else if (cov >= 80) {
            color = "lightgreen";
          } else if (cov >= 65) {
            color = "khaki";
          } else if (cov >= 50) {
            color = "goldenrod";
          } else {
            color = "crimson";
          }
          this.indicators.push(
          new QualityIndicator(
            stat.label + " Cover",
            cov.toString() + " %",
            color
          ));
        });
      }
    }
  }

  getDefaultColor() {
    return "gainsboro";
  }

  getBuildColor(build: VstsBuild): string {
    let color: string = "gainsboro";
    if (build) {
      switch (build.result) {
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
