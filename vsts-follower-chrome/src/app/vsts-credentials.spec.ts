import {VstsCredentials} from './vsts-credentials';

describe('VstsCredentials', () => {
  it('should create an instance', () => {
    const credentials = new VstsCredentials();
    credentials.login = 'bfo2017';
    credentials.token = 'Huyhgdstr87097898oloppszxg:!ùù';
    const expected = btoa(credentials.login.toLowerCase() + ':' + credentials.token);
    expect(credentials.getBasic()).toBe(expected);
  });
});
