import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { ControlDrawersService } from 'src/app/services/utils/control-drawers.service';

import { DrawerCardsComponent } from './drawer-cards.component';

describe('DrawerCardsComponent', () => {
  let component: DrawerCardsComponent;
  let fixture: ComponentFixture<DrawerCardsComponent>;

 let controlDrawerStub: jasmine.SpyObj<ControlDrawersService>
  beforeEach(async () => {
    controlDrawerStub = jasmine.createSpyObj('ControlDrawersService', {}, { awaitIdOpened: () => of([1]) });
    await TestBed.configureTestingModule({
      providers: [
        MatDialog,
        {provide: ControlDrawersService, useValue: controlDrawerStub}
      ],
      imports: [MatDialogModule, MatIconModule],
      declarations: [DrawerCardsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawerCardsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(controlDrawerStub, 'awaitIdOpened').and.returnValue(of([1]))
    controlDrawerStub.awaitIdOpened().subscribe((id) => {
      expect(id).toEqual([1])
    })
    expect(component).toBeTruthy();
  });

  it('should capitalize', () => {
    expect( component.capitalize("name")).toEqual('Name');
  });
});
