import { TestBed } from '@angular/core/testing';

import { AttendantXSocialworkService } from './attendant-xsocialwork.service';

describe('AttendantXSocialworkService', () => {
  let service: AttendantXSocialworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendantXSocialworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
