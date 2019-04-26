import { TestBed } from '@angular/core/testing';

import { GeorefService } from './georef.service';

describe('GeorefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeorefService = TestBed.get(GeorefService);
    expect(service).toBeTruthy();
  });
});
