import { TestBed } from '@angular/core/testing';

import { LiveScreenService } from './live-screen.service';

describe('LiveScreenService', () => {
  let service: LiveScreenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveScreenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
