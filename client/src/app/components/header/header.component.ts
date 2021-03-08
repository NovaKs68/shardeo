import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sectionChangedTransport = new EventEmitter<string>();
  selected = 'Populaire';

  constructor() { }

  ngOnInit(): void {
  }

  changeSection(sectionName: string): void {
    this.sectionChangedTransport.emit(sectionName);
    this.selected = sectionName;
  }

}
