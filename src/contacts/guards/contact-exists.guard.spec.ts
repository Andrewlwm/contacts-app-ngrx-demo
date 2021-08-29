import { TestBed } from '@angular/core/testing';

import { ContactExistsGuard } from './contact-exists.guard';

describe('ContactExistsGuard', () => {
  let guard: ContactExistsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContactExistsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
