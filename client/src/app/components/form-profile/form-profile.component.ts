import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {CustomValidators} from "../../helpers/custom-validators";

@Component({
  selector: 'app-form-profile',
  templateUrl: './form-profile.component.html',
  styleUrls: ['./form-profile.component.scss']
})
export class FormProfileComponent implements OnInit {

  @Input() user: User = new User();

  public formConfirmPassword!: FormGroup;
  public formModifyLastName!: FormGroup;
  public formModifyFirstName!: FormGroup;
  public formModifyEmail!: FormGroup;
  public formModifyPassword!: FormGroup;

  formModifyVerifyPasswordIsOpen: boolean = false;
  formModifyLastNameIsOpen: boolean = false;
  formModifyFirstNameIsOpen: boolean = false;
  formModifyEmailIsOpen: boolean = false;
  formModifyPasswordIsOpen: boolean = false;

  onModifyLastName: boolean = false;
  onModifyFirstName: boolean = false;
  onModifyEmail: boolean = false;
  onModifyPassword: boolean = false;

  lastNameFalse: boolean = false;
  firstNameFalse: boolean = false;
  emailFalse: boolean = false;
  passwordFalse: boolean = false;
  confirmPasswordFalse: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.formConfirmPassword = this.formBuilder.group({
      verifyPassword: ['', [Validators.required]]
    });
    this.formModifyLastName = this.formBuilder.group({
      last_name: ['', [Validators.required,
        Validators.minLength(2),
        // check if not entered password a number
        CustomValidators.patternValidator(/^[a-zA-Z]*$/, { hasNotOnlyText: true })]]
    });
    this.formModifyFirstName = this.formBuilder.group({
      first_name: ['', [Validators.required,
        Validators.minLength(2),
        // check if not entered password a number
        CustomValidators.patternValidator(/^[a-zA-Z]*$/, { hasNotOnlyText: true })]]
    });
    this.formModifyEmail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]]
    });
    this.formModifyPassword = this.formBuilder.group({
      password: ['', [Validators.required,
        Validators.minLength(8),
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // check whether the entered password has a special character
        CustomValidators.patternValidator(/[$&+,:;=?@#|'<>.^*()%!-]/, { hasSpecialCharacters: true })
      ]],
      confirmPassword: [null, Validators.compose([Validators.required])]
    })
  }

  closeModalModify() {
    this.formConfirmPassword.controls['verifyPassword'].setValue('');
    this.formModifyLastName.controls['last_name'].setValue('');
    this.formModifyFirstName.controls['first_name'].setValue('');
    this.formModifyEmail.controls['email'].setValue('');
    this.formModifyPassword.controls['password'].setValue('');
    this.formModifyPassword.controls['confirmPassword'].setValue('');

    this.formModifyVerifyPasswordIsOpen = false;
    this.formModifyLastNameIsOpen = false;
    this.formModifyFirstNameIsOpen = false;
    this.formModifyEmailIsOpen = false;
    this.formModifyPasswordIsOpen = false;

    this.onModifyLastName = false;
    this.onModifyFirstName = false;
    this.onModifyEmail = false;
    this.onModifyPassword = false;
  }

  disconnectUser() {
    this.authService.logout();
    this.router.navigate(['/popular']);
  }

  openModalModify(formModify: string) {
    // To make sure everything is closed
    this.closeModalModify();

    switch (formModify) {
      case 'lastName':
        this.formModifyVerifyPasswordIsOpen = true;
        this.onModifyLastName = true;
        break;
      case 'firstName':
        this.formModifyVerifyPasswordIsOpen = true;
        this.onModifyFirstName = true;
        break;
      case 'email':
        this.formModifyVerifyPasswordIsOpen = true;
        this.onModifyEmail = true;
        break;
      case 'password':
        this.formModifyVerifyPasswordIsOpen = true;
        this.onModifyPassword = true;
        break;
      default:
        console.error('Erreur : Impossible de modifier ce champs');
    }
  }

  async onSubmitFormConfirmPassword() {
    let success: boolean = false;
    await this.userService.checkPassword(this.formConfirmPassword.get('verifyPassword')!.value)
      .then(() => { success = true })
      .catch(() => {
        this.formConfirmPassword.get('verifyPassword')!.setErrors({ noPassswordMatch: true });
        success = false;
      });

    if (this.onModifyLastName && success) {
      this.formModifyLastNameIsOpen = true;
      this.formModifyVerifyPasswordIsOpen = false;
      return;
    }

    if (this.onModifyFirstName && success) {
      this.formModifyFirstNameIsOpen = true;
      this.formModifyVerifyPasswordIsOpen = false;
      return;
    }

    if (this.onModifyEmail && success) {
      this.formModifyEmailIsOpen = true;
      this.formModifyVerifyPasswordIsOpen = false;
      return;
    }

    if (this.onModifyPassword && success) {
      this.formModifyPasswordIsOpen = true;
      this.formModifyVerifyPasswordIsOpen = false;
      return;
    }

    console.error('Erreur : Lors de la confirmation de mot de passe')
  }

  async onSubmitFormModifyLastName() {
    const last_name = this.formModifyLastName.get('last_name')!.value;
    console.log(last_name);
    if (this.user.last_name != last_name) {
      await this.userService.changeLastName(this.user.id_user, last_name)
        .then(() => {
          this.closeModalModify();
          this.formModifyLastName.controls['last_name'].setValue('');
        })
        .catch(() => {
          this.formModifyLastName.get('last_name')!.setErrors({ errorServer: true });
          return;
        });
    }
    this.formModifyLastName.get('last_name')!.setErrors({ lastNameExisting: true });
  }

  async onSubmitFormModifyFirstName() {
    const first_name = this.formModifyFirstName.get('first_name')!.value;
    if (this.user.first_name != first_name) {
      await this.userService.changeFirstName(this.user.id_user, first_name)
        .then(() => {
          this.closeModalModify();
          this.formModifyFirstName.controls['first_name'].setValue('');
        })
        .catch(() => {
          this.formModifyFirstName.get('first_name')!.setErrors({ errorServer: true });
          return;
        });
    }
    this.formModifyFirstName.get('first_name')!.setErrors({ firstNameExisting: true });
  }

  async onSubmitFormModifyEmail() {
    const email = this.formModifyEmail.get('email')!.value;
    if (this.user.email != email) {
      await this.userService.changeEmail(this.user.id_user, email)
        .then(() => {
          this.closeModalModify();
          this.formModifyEmail.controls['email'].setValue('');
        })
        .catch(() => {
          this.formModifyEmail.get('email')!.setErrors({ errorServer: true });
          return;
        });
    }
    this.formModifyEmail.get('email')!.setErrors({ emailExisting: true });
  }

  async onSubmitFormModifyPassword() {
    const password = this.formModifyPassword.get('password')!.value;
    if (this.user.password != password) {
      await this.userService.changePassword(this.user.id_user, password)
        .then(() => {
          this.closeModalModify();
          this.formModifyPassword.controls['password'].setValue('');
        })
        .catch(() => {
          this.formModifyPassword.get('password')!.setErrors({ errorServer: true });
          return;
        });
    }
    this.formModifyPassword.get('password')!.setErrors({ passwordExisting: true });
  }
}
