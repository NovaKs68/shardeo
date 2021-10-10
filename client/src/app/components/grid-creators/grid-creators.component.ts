import {Component, Input, OnInit} from '@angular/core';
import {UserPreview} from "../../models/userPreview";

@Component({
  selector: 'app-grid-creators',
  templateUrl: './grid-creators.component.html',
  styleUrls: ['./grid-creators.component.scss']
})
export class GridCreatorsComponent implements OnInit {

  usersPreview: UserPreview[] = [];
  @Input()
  set getUsersPreview(usersPreview: UserPreview[]) {
    this.usersPreview = usersPreview;
    console.log(usersPreview);
  }

  constructor() { }

  ngOnInit(): void {
  }

  deleteAlbumWithNoMiniature(index: number): void {
    this.usersPreview.splice(index, 1);
  }

}
