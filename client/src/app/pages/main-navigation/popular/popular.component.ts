import { Component, OnInit } from '@angular/core';
import { MediaService } from "../../../services/media.service";
import { Media } from "../../../models/media";

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss']
})
export class PopularComponent implements OnInit {

  medias: Media[] = [];

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.getMedias();
  }

  getMedias() {
    this.mediaService.getMedias().subscribe(res => {
      this.medias = res.response;
      console.log(this.medias);
    });
  }

}
