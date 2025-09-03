import { TestBed } from '@angular/core/testing';

import { Benevoles } from './benevoles';

describe('Benevoles', () => {
  let service: Benevoles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Benevoles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
