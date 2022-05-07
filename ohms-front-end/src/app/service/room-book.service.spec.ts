import { TestBed } from '@angular/core/testing';

import { RoomBookService } from './room-book.service';

describe('RoomBookService', () => {
  let service: RoomBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
