import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<img src="../../../../assets/loading.gif" />',
  styles: ['@media screen and (max-width:800px){ img { width:250px }}']
  ,
})
export class LoadingComponent{
  constructor() { }
}
