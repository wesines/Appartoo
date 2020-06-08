import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PagolinComponent } from './pagolin/pagolin.component';
import { SignUpComponent } from './pagolin/sign-up/sign-up.component';
import { PagolinService } from './shared/pagolin.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { appRoutes } from './app-routing.module';
import { SignInComponent } from './pagolin/sign-in/sign-in.component';
import { PagolinProfileComponent } from './pagolin-profile/pagolinprofile.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HeaderComponent } from './header/header.component';
import { ListedesppangolinsComponent } from './listedesppangolins/listedesppangolins.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PagolinComponent,
    SignUpComponent,
    PagolinProfileComponent,
    SignInComponent,
    PagolinProfileComponent,
    ListedesppangolinsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,PagolinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
