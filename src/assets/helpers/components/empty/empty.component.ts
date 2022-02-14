import { Component } from '@angular/core';

@Component({
  selector: 'app-empty',
  template: `<div>
    <h1>No character details</h1>
    <img src="../../../../assets/empty.png" />
  </div>`,
})
export class EmptyComponent {
  constructor() {}
}
