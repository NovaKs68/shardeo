import { Component, OnInit } from '@angular/core';
import {Media} from "../../../models/media";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {UserPreview} from "../../../models/userPreview";
import {MediaService} from "../../../services/media.service";

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.scss']
})
export class MyPortfolioComponent implements OnInit {

  user: User = new User;
  medias: Media[] = [];
  userPreview: UserPreview = new UserPreview;

  constructor(private userService: UserService,
              private mediaService: MediaService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
      console.log(user);
    });
    this.userService.userPreview$.subscribe(userPreview => {
      this.userPreview = userPreview;
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

}
