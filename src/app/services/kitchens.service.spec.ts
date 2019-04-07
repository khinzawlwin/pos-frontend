import { TestBed } from '@angular/core/testing';

import { KitchensService } from './kitchens.service';

describe('KitchensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KitchensService = TestBed.get(KitchensService);
    expect(service).toBeTruthy();
  });
});
