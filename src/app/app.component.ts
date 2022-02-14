import { Component } from '@angular/core';
import { OrderBy } from 'src/assets/enums/orderBy.enum';
import { GetCharactersService } from './services/characters/get-characters.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Marvel';

  constructor(){
  }


}
