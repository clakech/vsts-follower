import { TestBed, inject } from '@angular/core/testing';
import { VstsCredentials } from '../vsts-credentials';
import { VstsProfileService } from './vsts-profile.service';

describe('VstsProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VstsProfileService]
    });
  });

  it('should ...', inject([VstsProfileService], (service: VstsProfileService) => {
    expect(service).toBeTruthy();
  }));

  it('should return null if no data', inject([VstsProfileService], (service: VstsProfileService) => {
    localStorage.removeItem(service.storageName);

    expect(service.getVstsProfile()).toBeNull();
  }));

  it('should get data from localStorage', inject([VstsProfileService], (service: VstsProfileService) => {
    const expected = {
      url: 'https://axafrance.visualstudio.com',
      login: 'user.name@axa.fr',
      token: 's1234567'
    };
    localStorage.setItem(service.storageName, JSON.stringify(expected));

    const currentDomain = service.getVstsProfile();

    expect(currentDomain).not.toBeNull();
    expect(currentDomain.login).toBe(expected.login);
    expect(currentDomain.token).toBe(expected.token);
    expect(currentDomain.url).toBe(expected.url);
  }));


  it('should set data to localStorage', inject([VstsProfileService], (service: VstsProfileService) => {
    const originalData = {
      url: 'https://axafrance.visualstudio.com',
      login: 'user.name@axa.fr',
      token: 's1234567'
    };
    localStorage.setItem(service.storageName, JSON.stringify(originalData));

    const expected: VstsCredentials = new VstsCredentials();
    expected.url = 'https://taichin.visualstudio.com';
    expected.login = 'user.name@outlook.com';
    expected.token = 'mdppowa';

    service.setVstsProfile(expected);

    const currentDomain = service.getVstsProfile();

    expect(currentDomain).not.toBeNull();
    expect(currentDomain.login).toBe(expected.login);
    expect(currentDomain.token).toBe(expected.token);
    expect(currentDomain.url).toBe(expected.url);
  }));

  it('should set data to localStorage', inject([VstsProfileService], (service: VstsProfileService) => {
  }));

});
