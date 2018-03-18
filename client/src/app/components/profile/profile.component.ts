import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Object;

  firstName: String;
  lastName: String;
  email: String;
  sex: Boolean;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      });
  }

  onUpdateProfile() {
    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      sex: this.sex
    };

    this.authService.updateProfile(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show( data.message, { cssClass: 'alert-success', timeout: 3000 });
      }
    })
  }

}
