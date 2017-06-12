import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/retrywhen';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/merge';

import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Injectable } from '@angular/core';
import { Measure } from './sonar-model';
import { Observable } from 'rxjs/Observable';
import { ProfileCredentials } from '../profile/profile-credentials';
import { ProfileService } from '../profile/profile.service';
import { Subscriber } from 'rxjs/Subscriber';

@Injectable()
export class SonarDataService {
  private requestOptions: RequestOptions;
  private profile: ProfileCredentials;

  constructor(public profileService: ProfileService, public http: Http) { }

  private setProfileAndHeaders() {
    this.profile = this.profileService.getProfile("sonarqube");
    if (this.profile) {
      let basic: string = 'Basic ' + btoa(this.profile.password + ":");
      let headers = new Headers({ 'Authorization': basic });
      this.requestOptions = new RequestOptions({ headers: headers });
    }
  }

  launchGetForUrl(url: string): Observable<Response> {
    return this.http.get(url, this.requestOptions);
  }

  getIndicators(componentKey: string): Observable<Array<Measure>> {
    this.setProfileAndHeaders();
    return this.launchGetForUrl(this.profile.url + "api/measures/component?metricKeys=tests,test_errors,coverage,bugs,vulnerabilities,code_smells,sqale_rating,reliability_rating,security_rating&componentKey=" + componentKey)
      .map((resp) => {
        let measures = new Array<Measure>();
        let result = JSON.parse(resp.text());
        if (result.component && result.component.measures) {
          result.component.measures.forEach(item => {
            let measure = new Measure();
            measure.metric = item.metric;
            measure.value = item.value;
            const splinted = measure.metric.split("_");
            if (splinted[splinted.length - 1] === "rating") {
              switch (item.value) {
                case "1.0":
                  measure.value = "A";
                  break;
                case "2.0":
                  measure.value = "B";
                  break;
                case "3.0":
                  measure.value = "C";
                  break;
                case "4.0":
                  measure.value = "D";
                  break;
                case "5.0":
                  measure.value = "E";
                  break;
                default:
                  measure.value = "-";
                  break;
              }
            }
            if (item.periods) {
              item.periods.forEach(period => {
                switch (period.index) {
                  case 3:
                    measure.period3Evolution = this.setEvolution(period.value);
                    break;
                  case 2:
                    measure.period2Evolution = this.setEvolution(period.value);
                    break;
                  default:
                    measure.period1Evolution = this.setEvolution(period.value);
                    break;
                }
              });
            }
            measures.push(measure);
          });
        }
        return measures.sort((a, b) => a.metric.localeCompare(b.metric));
      });
  }
  setEvolution(value: number): string {
    let val: string = null;
    if (value > 0) {
      val = "+";
    }
    if (value < 0) {
      val = "-";
    }
    return val;
  }
}
