import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBookComponent } from './room-book.component';

describe('RoomBookComponent', () => {
  let component: RoomBookComponent;
  let fixture: ComponentFixture<RoomBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
