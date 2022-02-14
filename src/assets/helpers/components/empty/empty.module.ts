import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EmptyComponent } from './empty.component';


@NgModule({
  declarations: [
     EmptyComponent
  ],
  imports: [
    BrowserModule,
  ],
  exports: [
    EmptyComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmptyModule { }
