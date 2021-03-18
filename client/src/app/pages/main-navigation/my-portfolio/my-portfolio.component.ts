import { Component, OnInit } from '@angular/core';
import {Media} from "../../../models/media";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {UserPreview} from "../../../models/userPreview";
import {MediaService} from "../../../services/media.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.scss']
})
export class MyPortfolioComponent implements OnInit {

  user: User = new User;
  medias: Media[] = [];
  userPreview: UserPreview = new UserPreview;
  fileToUpload: File | null = null;

  formAddMediaIsOpen: boolean = false;
  formAddBannerIsOpen: boolean = false;
  formAddDescriptionIsOpen: boolean = false;
  modalPublishIsOpen: boolean = false;

  public formAddMedia!: FormGroup;
  public formAddBanner!: FormGroup;
  public formAddDescription!: FormGroup;

  constructor(private userService: UserService,
              private mediaService: MediaService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });

    this.userService.userPreview$.subscribe(userPreview => {
      this.userPreview = userPreview;
    });

    this.formAddMedia = this.formBuilder.group({
      media: ['', [Validators.required]],
      titleMedia: ['', [Validators.required]],
      descriptionMedia: ['', [Validators.required]]
    });

    this.formAddBanner = this.formBuilder.group({
      banner: ['', [Validators.required]]
    });

    this.formAddDescription = this.formBuilder.group({
      addDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]]
    });

    // Todo : Remplacer le 1 par l'id de l'utilisateur enregistré lors du login
    /*this.userService.getUserById(1).subscribe(res => {
      this.user = res.response;
      this.userPreview = this.user;
      console.log(this.user);
    });*/
    console.log(this.userService.user$);

    this.mediaService.getMediasByCreator(this.user.id_user).subscribe(res => {
      this.medias = res.response;
      console.log(res);
    });
  }

  async onSubmitFormAddMedia() {
    const media = new Media;
    const FileMedia: File = this.fileToUpload!;
    media.title = this.formAddMedia.get('titleMedia')!.value;
    media.description_media = this.formAddMedia.get('descriptionMedia')!.value;
    media.upload_date = new Date;
    media.id_user = this.user.id_user;
    console.log(FileMedia);
    // Todo : dans le back si les champs ne sont pas reseignés (numberlike) les mettres à 0
    // Todo : Vérifier l'extension du fichier pour éviter des envoies inutiles
    // Todo : Mettre en place le système de thèmes
    if (FileMedia && true) {
      await this.mediaService.postMedia(media, FileMedia)
        .then(() => {
          this.closeModalModify();
          this.formAddMedia.controls['titleMedia'].setValue('');
          this.formAddMedia.controls['descriptionMedia'].setValue('');
          this.userService.updateUser();
          this.mediaService.getMediasByCreator(this.user.id_user).subscribe(res => {
            this.medias = res.response;
            console.log(res);
          });
        })
        .catch(() => {
          this.formAddMedia.get('media')!.setErrors({ errorServer: true });
          return;
        });
    }

    FileMedia ? this.formAddMedia.get('media')!.setErrors({ extensionFileError: true }) : this.formAddMedia.get('media')!.setErrors({ fileDoesntExist: true });
  }

  async onSubmitFormAddBanner() {
    const banner = this.formAddBanner.get('banner')!.value;
    console.log(banner);
    // Todo : Vérifier l'extension du fichier pour éviter des envoies inutiles
    if (true) {
      await this.userService.putBanner(this.user.id_user, banner)
        .then(() => {
          this.closeModalModify();
          this.formAddBanner.controls['banner'].setValue(null);
          this.mediaService.getMediasByCreator(this.user.id_user).subscribe(res => {
            this.medias = res.response;
            console.log(res);
          });
          this.userService.updateUser();
        })
        .catch(() => {
          console.log('error');
          this.formAddBanner.get('banner')!.setErrors({ errorServer: true });
          return;
        });
    }

    this.formAddBanner.get('banner')!.setErrors({ lastNameExisting: true });
  }

  async onSubmitFormAddDescription() {
    const description = this.formAddDescription.get('addDescription')!.value;
    console.log(description);
    // Todo : Vérifier l'extension du fichier pour éviter des envoies inutiles
    if (true) {
      await this.userService.putDescription(this.user.id_user, description)
        .then(() => {
          this.closeModalModify();
          this.formAddDescription.controls['addDescription'].setValue(description);
          console.log("OK");
          this.userService.updateUser();
        })
        .catch(() => {
          this.formAddDescription.get('addDescription')!.setErrors({ errorServer: true });
          return;
        });
    }

    this.formAddDescription.get('addDescription')!.setErrors({ lastNameExisting: true });
  }

  openModalAdd(formAdd: string) {
    // To make sure everything is closed
    this.closeModalModify();

    switch (formAdd) {
      case 'media':
        this.formAddMediaIsOpen = true;
        break;
      case 'banner':
        this.formAddBannerIsOpen = true;
        break;
      case 'description':
        this.formAddDescriptionIsOpen = true;
        break;
      case 'publish':
        this.modalPublishIsOpen = true;
        break;
      default:
        console.error('Erreur : Impossible de modifier ce champs');
    }
  }

  closeModalModify() {
    this.formAddMedia.controls['media'].setValue(null);
    this.formAddBanner.controls['banner'].setValue(null);
    this.formAddDescription.controls['addDescription'].setValue('');

    this.formAddMediaIsOpen = false;
    this.formAddBannerIsOpen = false;
    this.formAddDescriptionIsOpen = false;
    this.modalPublishIsOpen = false;
  }

  newMedia(file: File | null) {
    console.log(file);
    if (file) {
      this.fileToUpload = file;
    }
    this.formAddMedia.controls['media'].setValue(file);
  }

  newBanner(file: File | null) {
    if (file) {
      this.fileToUpload = file;
    }
    this.formAddBanner.controls['banner'].setValue(file);
  }

  async createPortfolio() {

    // Va vérifier si tous les champs sont remplis
    if (this.user.biography && this.user.banner && this.medias) {
      await this.userService.putPortfolio(this.user.id_user)
        .then(() => {
          this.closeModalModify();
          console.log("OK");
          this.userService.updateUser();
        })
        .catch(() => {
          return;
        });
    }

  }

}
