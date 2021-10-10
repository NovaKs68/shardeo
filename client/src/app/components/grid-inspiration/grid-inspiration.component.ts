import {Component, Input, OnInit} from '@angular/core';
import { Album } from "../../models/album";

@Component({
  selector: 'app-grid-inspiration',
  templateUrl: './grid-inspiration.component.html',
  styleUrls: ['./grid-inspiration.component.scss']
})
export class GridInspirationComponent implements OnInit {

  albums: Album[] = [];
  @Input()
  set getAlbums(album: Album[]) {
    this.albums = album;
    console.log(album);
  }

  constructor() { }

  ngOnInit(): void {
  }

  deleteAlbumWithNoMiniature(index: number): void {
    this.albums.splice(index, 1);
  }

}
