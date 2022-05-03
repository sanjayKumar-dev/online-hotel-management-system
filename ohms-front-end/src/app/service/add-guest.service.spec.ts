import { TestBed } from '@angular/core/testing';

import { AddGuestService } from './add-guest.service';

describe('AddGuestService', () => {
  let service: AddGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
