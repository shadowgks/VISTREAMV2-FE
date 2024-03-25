import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreditComponent } from './modal-credit.component';

describe('ModalCreditComponent', () => {
  let component: ModalCreditComponent;
  let fixture: ComponentFixture<ModalCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
