import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  username: string;
 
  constructor(name: string, username: string) {
    this.name = name;
    this.username = username;
  }
}

@Injectable()
export class AuthServiceProvider {

  currentUser: User;
 
  public login(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Bitte Benutzer einfügen");
    } else {
      return Observable.create(observer => {
        // API Check ob es korrekt ist
        let access = (credentials.password === "admin" && credentials.username === "administrator");
        this.currentUser = new User('Admin', 'administrator@villach.at');
        observer.next(access);
        observer.complete();
      });
    }
  }
 
  public register(credentials) {
    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Bitte Benutzer einfügen");
    } else {
      // Hier kommt der API Call
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
