import { TestBed, inject } from '@angular/core/testing';

import { SelectedBuildsService } from './selected-builds.service';

describe('SelectedBuildsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedBuildsService]
    });
  });

  it('should ...', inject([SelectedBuildsService], (service: SelectedBuildsService) => {
    expect(service).toBeTruthy();
  }));
});
