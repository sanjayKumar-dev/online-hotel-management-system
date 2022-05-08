import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingOperationComponent } from './booking-operation.component';

describe('BookingOperationComponent', () => {
  let component: BookingOperationComponent;
  let fixture: ComponentFixture<BookingOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
