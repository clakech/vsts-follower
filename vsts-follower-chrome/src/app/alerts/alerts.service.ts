import { Alert, AlertFilter, Alerts, ChromeAlertItem } from './alerts';

import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {

  constructor() { }

  sendAlert<T>(target: T, title: string, iconUrl: string, predicate: AlertFilter<T>) {
    const alert: Alert = new Alert();
    alert.title = title;
    alert.iconUrl = iconUrl;

    if (predicate.predicate(target)) {
      alert.message = predicate.message(target);
      this.sendChromeNotification(<NotificationOptions> alert);
    }
  }

  sendAggegateAlert<T>(target: T, title: string, message: string, iconUrl?: string, ...predicates: Array<AlertFilter<T>>) {
    const alertWithItems: Alerts = new Alerts();
    alertWithItems.title = title;
    alertWithItems.iconUrl = iconUrl;
    alertWithItems.message = message;
    alertWithItems.items = this.predicatesToAlertItems(predicates, target);
    if (alertWithItems) {
      this.sendChromeNotification(<NotificationOptions> alert);
    }
  }

  predicatesToAlertItems<T>(predicates: AlertFilter<T>[], target: T): string[] {
    const result = new Array<string>();
    result.push('');
    let sendResult = false;

    predicates.forEach(alert => {
      if (alert.predicate(target)) {
        sendResult = true;
        result.push(alert.message(target));
      }
    });

    return sendResult ? result : null;
  }

  sendChromeNotification(alert: NotificationOptions) {
    if (chrome && chrome.notifications) {
      chrome.notifications.create(
        '',
        alert
      );
    }
  }

}
