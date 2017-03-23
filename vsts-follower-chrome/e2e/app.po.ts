import { browser, element, by } from 'protractor';

export class VstsFollowerChromePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('alm-root h1')).getText();
  }
}
