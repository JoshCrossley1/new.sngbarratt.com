import { TestBed } from '@angular/core/testing';

import { JwtOptionsFactoryService } from './jwt-options-factory.service';

describe('JwtOptionsFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtOptionsFactoryService = TestBed.get(JwtOptionsFactoryService);
    expect(service).toBeTruthy();
  });
});
