import { TestBed } from '@angular/core/testing';

import { DeliverysService } from './deliverys.service';

describe('DeliverysService', () => {
  let service: DeliverysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
