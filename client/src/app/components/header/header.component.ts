import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selected = 'Populaire';
  isAuth: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuth$.subscribe(result => {
      console.log(result);
      this.isAuth = result;
    })
    this.authService.connectIfSessionExist();
  }

  changeSection(sectionName: string): void {
    this.selected = sectionName;
  }

}
