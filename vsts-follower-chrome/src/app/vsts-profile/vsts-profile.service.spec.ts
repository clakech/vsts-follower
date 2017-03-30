import { TestBed, inject } from '@angular/core/testing';

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

  it('should not have null data', inject([VstsProfileService], (service: VstsProfileService) => {
    expect(service.getVstsProfile()).not.toBeNull();
    expect(service.getVstsProfile().login).not.toBeNull();
    expect(service.getVstsProfile().token).not.toBeNull();
    expect(service.getVstsProfile().url).not.toBeNull();
  }));



});
