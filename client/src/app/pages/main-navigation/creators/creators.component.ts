import { Component, OnInit } from '@angular/core';
import {UserPreview} from "../../../models/userPreview";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {

  usersPreview: UserPreview[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsersPreview();
  }

  getUsersPreview() {
    this.userService.getUsersPreview().subscribe(res => {
      this.usersPreview = res.response;
      console.log(this.usersPreview);
    });
  }

}
