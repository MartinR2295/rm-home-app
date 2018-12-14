import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionProvider } from '../providers/session/session';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage:any;

  //to directly to Tabs Page, if the user is in the browser
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public session: SessionProvider) {
    if(platform.is('core') || platform.is('mobileweb')) {
      this.rootPage = TabsPage;
      return;
    }

    //load the auth-token
    platform.ready().then(() => {
     this.session.restore().then((isAuthenticated: Boolean) => {
        if (isAuthenticated) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
       })
       .then(() => {
         statusBar.styleDefault();
         splashScreen.hide();
       })
    }).catch((error) => {
      this.rootPage = LoginPage;
    });
  }
}