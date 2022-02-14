import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paginator } from 'src/app/models/dto/paginator.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  constructor() {}

  @Input() totalPages: number = 0;
  @Output() handlerPage: EventEmitter<Paginator> = new EventEmitter();

  handlerPages(event: Paginator) {
    this.handlerPage.emit(event);
  }
}
