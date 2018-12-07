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

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public session: SessionProvider) {
    // if(platform.is('core') || platform.is('mobileweb')) {
    //   this.rootPage = TabsPage;
    //   return;
    // }
   console.log("constructor of app.component.ts")
    platform.ready().then(() => {
      console.log("platform ready of app.component.ts")
     this.session.restore().then((isAuthenticated: Boolean) => {
      console.log("then of app.component.ts")
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
