import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComicsComponent } from './details-comics.component';

xdescribe('DetailsComicsComponent', () => {
  let component: DetailsComicsComponent;
  let fixture: ComponentFixture<DetailsComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComicsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
