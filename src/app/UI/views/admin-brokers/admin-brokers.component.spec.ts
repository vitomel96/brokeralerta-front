import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrokersComponent } from './admin-brokers.component';

describe('AdminBrokersComponent', () => {
  let component: AdminBrokersComponent;
  let fixture: ComponentFixture<AdminBrokersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBrokersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
