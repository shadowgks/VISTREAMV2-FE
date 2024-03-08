import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistreamLayoutComponent } from './vistream-layout.component';


describe('VistreamLayoutComponent', () => {
  let component: VistreamLayoutComponent;
  let fixture: ComponentFixture<VistreamLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistreamLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistreamLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
