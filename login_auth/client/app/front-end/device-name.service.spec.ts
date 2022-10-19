import { TestBed } from '@angular/core/testing';

import { DeviceNameService } from './device-name.service';

describe('DeviceNameService', () => {
  let service: DeviceNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
