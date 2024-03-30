import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessDashboardGuard } from './access-dashboard.guard';

describe('accessDashboardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessDashboardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
