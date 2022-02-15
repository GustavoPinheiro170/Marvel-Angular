import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderBy } from 'src/assets/enums/orderBy.enum';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should orderSelected', () => {
    component.orderByCharacters(OrderBy.Name);
    expect(component.orderSelected).toBeDefined();
  });

  it('should filterCharacters', () => {
    component.filterCharacters("Hulk");
    expect(component.filterCharacter).toBeDefined();
  });
});
