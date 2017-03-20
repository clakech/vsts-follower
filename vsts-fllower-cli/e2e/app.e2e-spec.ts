import { VstsFllowerCliPage } from './app.po';

describe('vsts-fllower-cli App', () => {
  let page: VstsFllowerCliPage;

  beforeEach(() => {
    page = new VstsFllowerCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
