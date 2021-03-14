import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });
  loading = false;
  emailFalse: boolean = false;
  passwordFalse: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this.loading = true;
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    this.authService.login(email, password).then(
      () => {
        this.loading = false;
        this.passwordFalse = false;
        this.emailFalse = false;
        this.router.navigate(['/popular']);
      }
    ).catch(
      (error) => {
        this.loading = false;
        switch (error.error.response) {
          case 'Email':
            this.emailFalse = true;
            this.passwordFalse = false;
            break;
          case 'Password':
            this.passwordFalse = true;
            this.emailFalse = false;
            break;
          default:
            this.passwordFalse = false;
            this.emailFalse = false;
        }
      }
    );
  }

}
