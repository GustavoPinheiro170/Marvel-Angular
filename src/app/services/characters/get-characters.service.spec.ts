import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CoreService } from '../core.service';
import { QueryStringService } from '../utils/query-string.service';
import { GetCharactersService } from './get-characters.service';

xdescribe('GetCharactersService', () => {
  let service: GetCharactersService;
  let httpTestingController: HttpTestingController;

  let coreServiceSpy: jasmine.SpyObj<CoreService>;
  let queryStringSpy: jasmine.SpyObj<QueryStringService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        HttpClientModule,
        GetCharactersService,
        { provide: CoreService, useValue: coreServiceSpy },
        { provide: QueryStringService, useValue: queryStringSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(GetCharactersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
