import { Component, Input, OnInit } from '@angular/core';
import { MainBuildsInfo, VstsBuild, VstsBuildDefinition, VstsProject } from '../../vsts/vsts-project';

class QualityIndicator {
  public name: string;
  public value: string;
  public color: string;
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
    let curent = new QualityIndicator();
    curent.color = "crimson";
    curent.name = "Failed tests";
    curent.value = "5";
    this.indicators.push(curent);
    curent = new QualityIndicator();
    curent.color = "goldenrod";
    curent.name = "Test Coverage";
    curent.value = "79 %";
    this.indicators.push(curent);
    this.setSonarNullInformations();
    curent = new QualityIndicator();
    curent.color = "goldenrod";
    curent.name = "Ignore tests";
    curent.value = "5";
    this.indicators.push(curent);
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
