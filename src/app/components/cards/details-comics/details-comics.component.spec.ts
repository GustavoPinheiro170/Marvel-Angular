import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { CharacterModel } from 'src/app/models/dto/character.model';
import { GetIdCharacterService } from 'src/app/services/characters/get-id-character.service';
import { DetailsComicsComponent } from './details-comics.component';

describe('DetailsComicsComponent', () => {
  let component: DetailsComicsComponent;
  let fixture: ComponentFixture<DetailsComicsComponent>;
  const model  = {
    ActionButton: 'Delete',
    SupportingText: 'Are you sure?',
  };

  let getCharacterIdStub: jasmine.SpyObj<GetIdCharacterService>;

  const fakeMarvelResponseData: CharacterModel[] = [new CharacterModel()];

  beforeEach(async () => {

    getCharacterIdStub = jasmine.createSpyObj('GetIdCharacterService', {}, { getIdCharacter: () => of(fakeMarvelResponseData)});
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [
        { provide : GetIdCharacterService, useValeu: getCharacterIdStub},
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MAT_DIALOG_DATA,
          useValue: model,
        },
      ],
      declarations: [DetailsComicsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(getCharacterIdStub, 'getIdCharacter').and.returnValue(of(fakeMarvelResponseData));
    component.ngOnInit()
    expect(component.comicDetails).toBeDefined()
    expect(component).toBeTruthy();
  });

  it('should capitalize', () => {
    expect( component.capitalize("name")).toEqual('Name');
  });
});
