import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormGroup, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './components/products/products.component';
import { SpecialsComponent } from './components/specials/specials.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuard } from './Services/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { IonicModule } from '@ionic/angular';



import { CartComponent } from './components/cart/cart.component';
import { PayfastComponent } from './components/payfast/payfast.component';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    SpecialsComponent,
    LandingPageComponent,
    CartComponent,
    PayfastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        }
      }
    }),
    IonicModule.forRoot()

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
