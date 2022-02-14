import { TestBed } from '@angular/core/testing';

import { QueryStringService } from './query-string.service';

xdescribe('QueryStringService', () => {
  let service: QueryStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
