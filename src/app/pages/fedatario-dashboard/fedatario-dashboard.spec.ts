import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FedatarioDashboard } from './fedatario-dashboard';

describe('FedatarioDashboard', () => {
  let component: FedatarioDashboard;
  let fixture: ComponentFixture<FedatarioDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedatarioDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(FedatarioDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
