import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestCurdComponent } from './guest-curd.component';

describe('GuestCurdComponent', () => {
  let component: GuestCurdComponent;
  let fixture: ComponentFixture<GuestCurdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestCurdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestCurdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
