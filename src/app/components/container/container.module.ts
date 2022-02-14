import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ContainerComponent } from './container.component';
import { FiltersComponent } from '../filters/filters.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { CardsModule } from '../cards/cards.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoadingModule } from 'src/assets/helpers/components/loading/loading.module';
import { EmptyModule } from 'src/assets/helpers/components/empty/empty.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ContainerComponent, FiltersComponent, PaginatorComponent],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CardsModule,
    MatProgressBarModule,
    MatSidenavModule,
    LoadingModule,
    EmptyModule,
    HttpClientModule
  ],
  exports: [ContainerComponent, FiltersComponent, PaginatorComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContainerModule {}
