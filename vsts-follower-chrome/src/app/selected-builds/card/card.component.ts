import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { MainBuildsInfo, VstsBuild, VstsBuildDefinition, VstsProject } from '../../vsts/vsts-project';

import { Measure } from '../../sonar/sonar-model';
import { SonarDataService } from '../../sonar/sonar-data.service';

class QualityIndicator {
  public name: string;
  public value: string;
  public color: string;
  public type: string;

  constructor(name?: string, value?: string, color?: string, type?: string) {
    this.name = name;
    this.value = value;
    this.color = color;
    this.type = type;
  }
}

@Component({
  selector: 'follow-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {

  @Input() build: MainBuildsInfo = new MainBuildsInfo(new VstsBuildDefinition());
  @Input() measures: Array<Measure> = new Array<Measure>();
  public indicators: Array<QualityIndicator> = new Array<QualityIndicator>();

  constructor() { }

  ngOnInit() {
    this.setBuildIndicators();
  }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (changes.measures && changes.measures.currentValue && changes.measures.currentValue.length > 0) {
      this.setBuildIndicators();
    }
  }

  setBuildIndicators() {
    //this.indicators  = new Array<QualityIndicator>(); //<- ré-instancié quand l'un des appel arrive après l'autre
    let haveTests = false;
    let haveCoverages = false;
    if (this.measures) {
      this.measures.forEach(measure => {
        if (measure.metric === "test_errors" && measure.value !== "0") {
          this.indicators.push(
            new QualityIndicator(
              "Failed Tests",
              measure.value,
              "crimson"
            ));
          haveTests = true;
        } else if (measure.metric === "tests" && measure.value !== "0") {
          this.indicators.push(
            new QualityIndicator(
              "Total Tests",
              measure.value,
              "#6E6E6E"
            ));
          haveTests = true;
        } else if (measure.metric === "coverage") {
          let cov = +measure.value;
          let color = "#6E6E6E";
          if (cov >= 99) {
            color = "limegreen";
          } else if (cov >= 80) {
            color = "lightgreen";
          } else if (cov >= 65) {
            color = "khaki";
          } else if (cov >= 50) {
            color = "#DF7401";
          } else {
            color = "crimson";
          }
          this.indicators.push(
            new QualityIndicator(
              "Coverage",
              cov.toString(),
              color,
              "percent"
            ));
          haveCoverages = true;
        } else {
          this.indicators.push(
            <QualityIndicator>{
              name: measure.metric.replace("_", " "),
              value: measure.value,
              color: this.getColorByNote(measure.value)
            }
          );
        }
      });
    }
    if (this.build.testResult && this.build.testResult.totalTests > 0) {
      if (!haveTests) {
        this.indicators.push(
          new QualityIndicator(
            "Total Tests",
            this.build.testResult.totalTests.toString(),
            "#6E6E6E"
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
              "#DF7401"
            ));
        }
      }
      if (!haveCoverages && this.build.testResult.coverageStats && this.build.testResult.coverageStats.length > 0) {
        this.build.testResult.coverageStats.forEach(stat => {
          let cov = Math.round((stat.covered / stat.total) * 100);
          let color = "gainsboro";
          if (cov >= 99) {
            color = "limegreen";
          } else if (cov >= 80) {
            color = "lightgreen";
          } else if (cov >= 65) {
            color = "khaki";
          } else if (cov >= 50) {
            color = "#DF7401";
          } else {
            color = "crimson";
          }
          this.indicators.push(
            // new QualityIndicator(
            //   stat.label + " Cover",
            //   cov.toString(),
            //   color
            // ));
            
            new QualityIndicator(
              stat.label + " Cover",
              cov.toString(),
              color,
              "percent"
            ));
        });
      }
    }
  }

  getDefaultColor() {
    return "#6E6E6E";    
  }

  getBuildColor(build: VstsBuild): string {
    let color: string = "#6E6E6E";
    if (build) {
      switch (build.result) {
        case "succeeded":
          color = "#088A08";
          break;
        case "partiallySucceeded":
          color = "#DF7401";
          break;
        case "failed":
          color = "#B40404";
          break;
        default:
          color = "#6E6E6E";
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
        color = "#DF7401";
        break;
      case "E":
        color = "crimson";
        break;
      default:
        color = "#6E6E6E";
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
