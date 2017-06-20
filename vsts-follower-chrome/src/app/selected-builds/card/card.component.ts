import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { MainBuildsInfo, VstsBuild, VstsBuildDefinition } from '../../vsts/vsts-project';

import { AlertFilter } from '../../alerts/alerts';
import { AlertsService } from '../../alerts/alerts.service';
import { Measure } from '../../sonar/sonar-model';

class QualityIndicator {
  public name: string;
  public value: string;
  public color: string;
  public type: string;
  public lastAnalysis: QualityIndicatorHistory;
  public lastVersion: QualityIndicatorHistory;
  public sevenDays: QualityIndicatorHistory;

  constructor(
    name?: string,
    value?: string,
    color?: string,
    lastAnalysis?: QualityIndicatorHistory,
    lastVersion?: QualityIndicatorHistory,
    sevenDays?: QualityIndicatorHistory,
    type?: string) {
    this.name = name;
    this.value = value;
    this.color = color;
    this.type = type;
    this.lastAnalysis = lastAnalysis;
    this.lastVersion = lastVersion;
    this.sevenDays = sevenDays;
  }
}

class QualityIndicatorHistory {
  public diff: string;
  public color: string;

  constructor(diff?: string, color?: string) {
    this.diff = diff;
    this.color = color;
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

  private noTestAlert = new AlertFilter<Array<QualityIndicator>>();

  constructor(private alerts: AlertsService) {
    this.noTestAlert.message =  indicators => 'No test found';
    this.noTestAlert.predicate = indicators => {
      if (indicators && indicators.length > 0) {
        const result = indicators.filter(i => i.name === 'Total Tests')
        return !(result && result.length > 0);
      }
      return false;
    };
  }

  ngOnInit() {
    this.setBuildIndicators();
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes.measures && changes.measures.currentValue && changes.measures.currentValue.length > 0) {
      this.setBuildIndicators();
    }
  }

  setBuildIndicators() {
    let indicators  = new Array<QualityIndicator>();
    let haveTests = false;
    let haveCoverages = false;
    if (this.measures) {
      this.measures.forEach(measure => {
        if (measure.metric === 'test_errors') {
          if (measure.value !== '0') {
            indicators.push(
              new QualityIndicator(
                'Tests Failed',
                measure.value,
                'crimson',
                measure.period2Evolution ? new QualityIndicatorHistory(
                  measure.period2Evolution,
                  (measure.period2Evolution === '+') ? 'crimson' : 'limegreen'
                ) : null,
                measure.period1Evolution ? new QualityIndicatorHistory(
                  measure.period1Evolution,
                  (measure.period1Evolution === '+') ? 'crimson' : 'limegreen'
                ) : null,
                measure.period3Evolution ? new QualityIndicatorHistory(
                  measure.period3Evolution,
                  (measure.period3Evolution === '+') ? 'crimson' : 'limegreen'
                ) : null
              ));
          }
          haveTests = true;
        } else if (measure.metric === 'tests') {
          if (measure.value !== '0') {
          indicators.push(
            new QualityIndicator(
              'Total Tests',
              measure.value,
              '#6E6E6E',
              measure.period2Evolution ? new QualityIndicatorHistory(
                measure.period2Evolution,
                (measure.period2Evolution === '+') ? 'limegreen' : 'crimson'
              ) : null,
              measure.period1Evolution ? new QualityIndicatorHistory(
                measure.period1Evolution,
                (measure.period1Evolution === '+') ? 'limegreen' : 'crimson'
              ) : null,
              measure.period3Evolution ? new QualityIndicatorHistory(
                measure.period3Evolution,
                (measure.period3Evolution === '+') ? 'limegreen' : 'crimson'
              ) : null
            ));
          }
          haveTests = true;
        } else if (measure.metric === 'coverage') {
          const cov = +measure.value;
          let color = '#6E6E6E';
          if (cov >= 99) {
            color = 'limegreen';
          } else if (cov >= 80) {
            color = 'lightgreen';
          } else if (cov >= 65) {
            color = 'khaki';
          } else if (cov >= 50) {
            color = '#DF7401';
          } else {
            color = 'crimson';
          }
          indicators.push(
            new QualityIndicator(
              'Coverage',
              cov.toString(),
              color,
              measure.period2Evolution ? new QualityIndicatorHistory(
                measure.period2Evolution,
                (measure.period2Evolution === '+') ? 'limegreen' : 'crimson'
              ) : null,
              measure.period1Evolution ? new QualityIndicatorHistory(
                measure.period1Evolution,
                (measure.period1Evolution === '+') ? 'limegreen' : 'crimson'
              ) : null,
              measure.period3Evolution ? new QualityIndicatorHistory(
                measure.period3Evolution,
                (measure.period3Evolution === '+') ? 'limegreen' : 'crimson'
              ) : null,
              'percent'
            ));
          haveCoverages = true;
        } else {
          indicators.push(
            <QualityIndicator>{
              name: measure.metric.replace('_', ' '),
              value: measure.value,
              color: this.getColorByNote(measure.value),
              lastAnalysis: measure.period2Evolution ? new QualityIndicatorHistory(
                measure.period2Evolution,
                (measure.period2Evolution === '+') ? 'crimson' : 'limegreen'
              ) : null,
              lastVersion: measure.period1Evolution ? new QualityIndicatorHistory(
                measure.period1Evolution,
                (measure.period1Evolution === '+') ? 'crimson' : 'limegreen'
              ) : null,
              sevenDays: measure.period3Evolution ? new QualityIndicatorHistory(
                measure.period3Evolution,
                (measure.period3Evolution === '+') ? 'crimson' : 'limegreen'
              ) : null
            }
          );
        }
      });
    }
    if (this.build.testResult && this.build.testResult.totalTests > 0) {
      if (!haveTests) {
        indicators.push(
          new QualityIndicator(
            'Total Tests',
            this.build.testResult.totalTests.toString(),
            '#6E6E6E'
          ));
        if (this.build.testResult.failedTests > 0) {
          indicators.push(
            new QualityIndicator(
              'Tests Failed',
              this.build.testResult.failedTests.toString(),
              'crimson'
            ));
        }
        if (this.build.testResult.ignoredTests > 0) {
          indicators.push(
            new QualityIndicator(
              'Tests Ignored',
              this.build.testResult.ignoredTests.toString(),
              '#DF7401'
            ));
        }
      }
      if (!haveCoverages && this.build.testResult.coverageStats && this.build.testResult.coverageStats.length > 0) {
        this.build.testResult.coverageStats.forEach(stat => {
          const cov = Math.round((stat.covered / stat.total) * 100);
          let color = 'gainsboro';
          if (cov >= 99) {
            color = 'limegreen';
          } else if (cov >= 80) {
            color = 'lightgreen';
          } else if (cov >= 65) {
            color = 'khaki';
          } else if (cov >= 50) {
            color = '#DF7401';
          } else {
            color = 'crimson';
          }
          indicators.push(
            new QualityIndicator(
              'Cover (' + stat.label + ')',
              cov.toString(),
              color,
              null,
              null,
              null,
              'percent'
            ));
        });
      }
    }
    this.indicators = indicators.sort((prev, next) => prev.name.localeCompare(next.name));

    this.alerts.sendAlert(
      indicators,
      this.build.definition.name + ' build error',
      null,
      this.noTestAlert
      );
  }

  getDefaultColor() {
    return '#6E6E6E';
  }

  getBuildColor(build: VstsBuild): string {
    let color = '#6E6E6E';
    if (build) {
      switch (build.result) {
        case 'succeeded':
          color = '#088A08';
          break;
        case 'partiallySucceeded':
          color = '#DF7401';
          break;
        case 'failed':
          color = '#B40404';
          break;
        default:
          color = '#6E6E6E';
          break;
      }
    }
    return color;
  }

  getColorByNote(note: string) {
    let color: string;
    switch (note) {
      case 'A':
        color = 'limegreen';
        break;
      case 'B':
        color = 'lightgreen';
        break;
      case 'C':
        color = 'khaki';
        break;
      case 'D':
        color = '#DF7401';
        break;
      case 'E':
        color = 'crimson';
        break;
      default:
        color = '#6E6E6E';
        break;
    }
    return color;
  }

}
