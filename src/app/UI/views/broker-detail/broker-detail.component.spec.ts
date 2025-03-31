import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerDetailComponent } from './broker-detail.component';

describe('BrokerDetailComponent', () => {
  let component: BrokerDetailComponent;
  let fixture: ComponentFixture<BrokerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
