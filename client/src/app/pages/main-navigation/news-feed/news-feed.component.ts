import { Component, OnInit } from '@angular/core';
import { Media } from "../../../models/media";
import { MediaService } from "../../../services/media.service";

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {

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
