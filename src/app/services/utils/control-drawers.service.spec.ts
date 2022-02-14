import { TestBed } from '@angular/core/testing';

import { ControlDrawersService } from './control-drawers.service';

xdescribe('ControlDrawersService', () => {
  let service: ControlDrawersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlDrawersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
