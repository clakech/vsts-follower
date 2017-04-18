import { TestBed, inject } from '@angular/core/testing';
import { ProfileCredentials } from './profile-credentials';
import { ProfileService } from './profile.service';

describe('VstsProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService]
    });
  });

  it('should ...', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));

  it('should return null if no data', inject([ProfileService], (service: ProfileService) => {
    localStorage.removeItem(service.storageName);

    expect(service.getProfile()).toBeNull();
  }));

  it('should get data from localStorage', inject([ProfileService], (service: ProfileService) => {
    const expected = {
      url: 'https://axafrance.visualstudio.com',
      login: 'user.name@axa.fr',
      token: 's1234567'
    };
    localStorage.setItem(service.storageName, JSON.stringify(expected));

    const currentDomain = service.getProfile();

    expect(currentDomain).not.toBeNull();
    expect(currentDomain.login).toBe(expected.login);
    expect(currentDomain.password).toBe(expected.token);
    expect(currentDomain.url).toBe(expected.url);
  }));


  it('should set data to localStorage', inject([ProfileService], (service: ProfileService) => {
    const originalData = {
      url: 'https://axafrance.visualstudio.com',
      login: 'user.name@axa.fr',
      token: 's1234567'
    };
    localStorage.setItem(service.storageName, JSON.stringify(originalData));

    const expected: ProfileCredentials = new ProfileCredentials();
    expected.url = 'https://taichin.visualstudio.com';
    expected.login = 'user.name@outlook.com';
    expected.password = 'mdppowa';

    service.setProfile(expected);

    const currentDomain = service.getProfile();

    expect(currentDomain).not.toBeNull();
    expect(currentDomain.login).toBe(expected.login);
    expect(currentDomain.password).toBe(expected.password);
    expect(currentDomain.url).toBe(expected.url);
  }));

  it('should set data to localStorage', inject([ProfileService], (service: ProfileService) => {
  }));

});
