import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddProductPage } from '../pages/add-product/add-product';
import { ScanViewPage } from '../pages/scan-view/scan-view';
import { MoveObjectPage } from '../pages/move-object/move-object';
import { RemoveObjectPage } from '../pages/remove-object/remove-object';
import { InspectObjectPage } from '../pages/inspect-object/inspect-object';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { BaseProvider } from '../providers/base/base';
import { ObjectProvider } from '../providers/object/object';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { AlertHelperProvider } from '../providers/alert-helper/alert-helper';
import { RegisterPage } from '../pages/register/register';
import { SessionProvider } from '../providers/session/session';
import { SecureStorage } from '@ionic-native/secure-storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { ObjectDetailPage } from '../pages/object-detail/object-detail';
import { UserProvider } from '../providers/user/user';
import { PasswordPage } from '../pages/password/password';
import { QRScanner } from '@ionic-native/qr-scanner';
import { ObjectEditPage } from '../pages/object-edit/object-edit';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    AddProductPage,
    SearchPage,
    SettingsPage,
    ScanViewPage,
    RegisterPage,
    ObjectDetailPage,
    PasswordPage,
    MoveObjectPage,
    ObjectDetailPage,
    ObjectEditPage,
    RemoveObjectPage,
    InspectObjectPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    FormsModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ScanViewPage,
    TabsPage,
    LoginPage,
    AddProductPage,
    SearchPage,
    SettingsPage,
    RegisterPage,
    ObjectDetailPage,
    PasswordPage,
    MoveObjectPage,
    ObjectEditPage,
    RemoveObjectPage,
    InspectObjectPage
  ],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    BaseProvider,
    ObjectProvider,
    AlertHelperProvider,
    SessionProvider,
    SecureStorage,
    SpinnerDialog,
    UserProvider,
    QRScanner
  ]
})
export class AppModule {}
