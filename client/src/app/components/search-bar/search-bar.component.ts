import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger('isFocus', [
      state('state1', style({right: '0px',})),
      state('state2', style({right: '65px',})),
      transition('state1=>state2', animate('250ms')),
      transition('state2=>state1', animate('250ms 250ms')),
    ]),
    trigger('move', [
      state('state1', style({right: '0px',})),
      state('state2', style({right: '60px', width: '400px'})),
      transition('state1=>state2', animate('250ms 250ms')),
      transition('state2=>state1', animate('250ms')),
    ])
  ]
})

/*@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  animations: [
    trigger('isFocus', [
      transition('state1=>state2', [
        query('img', [
          state('state1', style({right: '70px'})),
          //style({right: '70px'}),
          /!*stagger(0, [
            animate('250ms', style({right: '70px'})),
          ])*!/
        ])
      ]),
      transition('state2=>state1', [
        query('img', [
          style({right: '0px'}),
          animate('250ms')
        ])
      ])
    ])
  ]
})*/

export class SearchBarComponent implements OnInit {

  isFocus: string = 'state1';

  constructor() { }

  ngOnInit(): void {
  }

  setFocusSearch() {
    document.getElementById('input')!.focus();
  }

  focus() {
    this.isFocus = 'state2';
    console.log(this.isFocus);
  }

  focusOut() {
    this.isFocus = 'state1';
    console.log(this.isFocus);
  }

}
