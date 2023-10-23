import { TestBed } from '@angular/core/testing';

import { OpenExchangeRatesService } from './open-exchange-rates.service';

describe('OpenExchangeRatesService', () => {
  let service: OpenExchangeRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenExchangeRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
