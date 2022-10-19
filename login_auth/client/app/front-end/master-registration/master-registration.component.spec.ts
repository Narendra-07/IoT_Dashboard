import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRegistrationComponent } from './master-registration.component';

describe('MasterRegistrationComponent', () => {
  let component: MasterRegistrationComponent;
  let fixture: ComponentFixture<MasterRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
