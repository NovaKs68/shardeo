import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MediaService} from '../../services/media.service';

import { mimeType } from '../../mime-type.validator';
import { Media } from '../../models/media';

@Component({
  selector: 'app-test-create-media',
  templateUrl: './test-create-media.component.html',
  styleUrls: ['./test-create-media.component.scss']
})
export class TestCreateMediaComponent implements OnInit {

  public mediaForm!: FormGroup;
  fileToUpload!: File;


  constructor(private mediaService: MediaService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.mediaForm = this.formBuilder.group({
      title: [null, Validators.required],
      description_media: [null, Validators.required],
      upload_date: [null, Validators.required],
      number_view: [null, Validators.required],
      number_like: [null, Validators.required],
      file: [null, Validators.required, mimeType],
      id_theme: [null, Validators.required],
    });
  }

  async onSubmit(): Promise<void> {

    const media = new Media();
    media.title = this.mediaForm.get('title')!.value;
    media.description_media = this.mediaForm.get('description_media')!.value;
    media.upload_date = this.mediaForm.get('upload_date')!.value;
    media.number_view = this.mediaForm.get('number_view')!.value;
    media.number_like = this.mediaForm.get('number_like')!.value;
    media.id_user = this.mediaForm.get('id_theme')!.value;
    const file = this.mediaForm.get('file')!.value;

    console.log('Le contre file ' + this.fileToUpload);


    this.mediaService.postMedia(media, this.fileToUpload);
    console.warn(this.mediaForm.value);
  }

  test() {

    console.warn(this.mediaService.getMedias());
  }

  handleFileInput(e?: Event) {
    this.fileToUpload = (<HTMLInputElement>e!.target).files![0];
  }

}
