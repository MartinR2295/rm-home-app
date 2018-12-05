import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SessionProvider } from '../providers/session/session';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html',
  providers: [SessionProvider]
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, session: SessionProvider) {
    platform.ready().then(() => {
     session.restore().then((isAuthenticated: Boolean) => {
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
    });
  }
}
