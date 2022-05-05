import { TestBed } from '@angular/core/testing';

import { GuestCurdService } from './guest-curd.service';

describe('GuestCurdService', () => {
  let service: GuestCurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestCurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
