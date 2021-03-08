import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  selected = 'Populaire';

  constructor() { }

  ngOnInit(): void {
  }

  changeSection(sectionName: string) {
    this.selected = sectionName;
  }

}
