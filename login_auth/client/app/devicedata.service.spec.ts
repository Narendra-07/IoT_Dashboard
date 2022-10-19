import { TestBed } from '@angular/core/testing';

import { DevicedataService } from './devicedata.service';

describe('DevicedataService', () => {
  let service: DevicedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevicedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
