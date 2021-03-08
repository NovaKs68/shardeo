import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../../../services/album.service";
import {Album} from "../../../models/album";

@Component({
  selector: 'app-inspiration',
  templateUrl: './inspiration.component.html',
  styleUrls: ['./inspiration.component.scss']
})
export class InspirationComponent implements OnInit {

  albums: Album[] = [];

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums() {
    this.albumService.getAlbums().subscribe(res => {
      this.albums = res.response;
      console.log(this.albums);
    });
  }

}
