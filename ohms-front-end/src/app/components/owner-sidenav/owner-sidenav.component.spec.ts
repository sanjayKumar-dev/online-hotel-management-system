import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerSidenavComponent } from './owner-sidenav.component';

describe('OwnerSidenavComponent', () => {
  let component: OwnerSidenavComponent;
  let fixture: ComponentFixture<OwnerSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
