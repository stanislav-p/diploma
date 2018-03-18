import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: String;
  password: String;
  confirmPassword: String;

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    // Required Fields
    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate Password
    if (!this.validateService.validatePassword(user.password, user.confirmPassword)) {
      this.flashMessage.show('Passwords don\'t match!', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show( data.message, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['login']);
      } else {
        this.flashMessage.show( data.message, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['register']);
      }
    });
  }

}
