import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerCardsComponent } from './drawer-cards.component';

xdescribe('DrawerCardsComponent', () => {
  let component: DrawerCardsComponent;
  let fixture: ComponentFixture<DrawerCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawerCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
