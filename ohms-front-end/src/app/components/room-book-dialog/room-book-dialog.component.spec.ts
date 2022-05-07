import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomBookDialogComponent } from './room-book-dialog.component';

describe('RoomBookDialogComponent', () => {
  let component: RoomBookDialogComponent;
  let fixture: ComponentFixture<RoomBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomBookDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
