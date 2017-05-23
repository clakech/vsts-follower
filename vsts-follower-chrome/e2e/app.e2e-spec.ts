import { VstsFollowerChromePage } from './app.po';

describe('vsts-follower-chrome App', () => {
  let page: VstsFollowerChromePage;

  beforeEach(() => {
    page = new VstsFollowerChromePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('follow works!');
  });
});
