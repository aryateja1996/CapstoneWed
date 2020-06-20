import { TestBed } from '@angular/core/testing';

import { ProserveService } from './proserve.service';

describe('ProserveService', () => {
  let service: ProserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
