import { TestBed } from '@angular/core/testing';

import { LoadedGuard } from './loaded.guard';

describe('LoadedGuard', () => {
  let guard: LoadedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoadedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
