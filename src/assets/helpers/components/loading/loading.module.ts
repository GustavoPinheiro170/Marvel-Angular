import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingComponent } from './loading.component';


@NgModule({
  declarations: [
     LoadingComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    LoadingComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoadingModule { }
