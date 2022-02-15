import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterModel } from 'src/app/models/dto/character.model';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trackByCards', () => {
    expect(component.trackByCards(0, new CharacterModel())).toEqual(new CharacterModel());
  });
});
