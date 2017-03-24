import { browser, element, by } from 'protractor';

export class VstsFollowerChromePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('follow-root h1')).getText();
  }
}
