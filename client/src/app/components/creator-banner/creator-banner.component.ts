import {Component, Input, OnInit} from '@angular/core';
import {UserPreview} from "../../models/userPreview";

@Component({
  selector: 'app-creator-banner',
  templateUrl: './creator-banner.component.html',
  styleUrls: ['./creator-banner.component.scss']
})
export class CreatorBannerComponent implements OnInit {

  userPreview: UserPreview = new UserPreview;
  @Input()
  set getUsersPreview(userPreview: UserPreview) {
    this.userPreview = userPreview;
    console.log(userPreview);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
