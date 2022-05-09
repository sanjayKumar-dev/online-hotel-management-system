import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionSidenavComponent } from './reception-sidenav.component';

describe('ReceptionSidenavComponent', () => {
  let component: ReceptionSidenavComponent;
  let fixture: ComponentFixture<ReceptionSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceptionSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
