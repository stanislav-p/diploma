import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateLogin(user) {
    if (user.username == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateRegister(user) {
    if (user.username == undefined || user.password == undefined || user.confirmPassword == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validatePassword(password, confirmPassword) {
    if (password != confirmPassword) {
      return false;
    } else {
      return true;
    }
  }


}
