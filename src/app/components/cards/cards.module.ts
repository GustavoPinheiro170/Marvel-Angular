import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { DetailsComicsComponent } from './details-comics/details-comics.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDrawer,
  MatSidenav,
  MatSidenavModule,
} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingModule } from 'src/assets/helpers/components/loading/loading.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DrawerCardsComponent } from './drawer-cards/drawer-cards.component';
import { EmptyModule } from 'src/assets/helpers/components/empty/empty.module';

@NgModule({
  declarations: [CardsComponent, DetailsComicsComponent, DrawerCardsComponent],

  exports: [CardsComponent, DetailsComicsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LoadingModule,
    MatDialogModule,
    MatSidenavModule,
    EmptyModule,
  ],
  providers: [MatDrawer, MatSidenav],
})
export class CardsModule {}
