import { TestBed } from '@angular/core/testing';

import { DemandsService } from './demands.service';

describe('DemandsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandsService = TestBed.get(DemandsService);
    expect(service).toBeTruthy();
  });
});
