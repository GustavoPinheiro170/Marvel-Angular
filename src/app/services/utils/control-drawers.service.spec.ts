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
  });
});
