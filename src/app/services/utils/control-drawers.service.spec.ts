import { TestBed } from '@angular/core/testing';

import { ControlDrawersService } from './control-drawers.service';

describe('ControlDrawersService', () => {
  let service: ControlDrawersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlDrawersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('expected call toggleIdOpened', () => {
    service.toggleIdOpened(120);
    expect(service.othersIdsOpened).toEqual([120])
  });

  it('expected call toggleIdOpened two ids', () => {
    service.othersIdsOpened = [120]
    service.toggleIdOpened(10);
    expect(service.othersIdsOpened).toEqual([10])
  });

  it('expected call awaitIdOpened', () => {
    expect( service.awaitIdOpened()).toBeDefined()
  });
});
