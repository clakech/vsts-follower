import {ProfileCredentials} from './profile-credentials';

describe('ProfileCredentials', () => {
  it('should create an instance', () => {
    const credentials = new ProfileCredentials();
    credentials.login = 'bfo2017';
    credentials.password = 'Huyhgdstr87097898oloppszxg:!ùù';
    const expected = btoa(credentials.login.toLowerCase() + ':' + credentials.password);
    expect(credentials.getBasic()).toBe(expected);
  });
});
