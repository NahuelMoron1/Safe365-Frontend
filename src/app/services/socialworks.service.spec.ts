import { TestBed } from '@angular/core/testing';

import { SocialworksService } from './socialworks.service';

describe('SocialworksService', () => {
  let service: SocialworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
