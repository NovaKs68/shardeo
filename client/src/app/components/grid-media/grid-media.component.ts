import {Component, Input, OnInit} from '@angular/core';
import {Media} from "../../models/media";

@Component({
  selector: 'app-grid-media',
  templateUrl: './grid-media.component.html',
  styleUrls: ['./grid-media.component.scss']
})
export class GridMediaComponent implements OnInit {

  medias: Media[] = [];
  @Input()
  set getMedias(medias: Media[]) {

    this.medias = medias;
  }

  constructor() { }

  ngOnInit(): void { }

  deleteMediaWithNoImage(index: number): void {
    this.medias.splice(index, 1);
  }

  generateDisplayMedias() {
    const height = 500; // Pixel

  }

}
