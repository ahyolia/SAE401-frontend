import { TestBed } from '@angular/core/testing';

import { Carrousel } from './carrousel';

describe('Carrousel', () => {
  let service: Carrousel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Carrousel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
