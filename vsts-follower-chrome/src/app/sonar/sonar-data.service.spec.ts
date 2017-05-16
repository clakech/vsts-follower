import { TestBed, inject } from '@angular/core/testing';

import { SonarDataService } from './sonar-data.service';

describe('SonarDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SonarDataService]
    });
  });

  it('should ...', inject([SonarDataService], (service: SonarDataService) => {
    expect(service).toBeTruthy();
  }));
});
