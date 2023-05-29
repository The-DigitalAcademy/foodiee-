import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { SpecialsComponent } from './components/specials/specials.component';
import { AboutComponent } from './components/about/about.component';

import { AuthGuard } from './Services/auth.guard';

import { CartComponent } from './components/cart/cart.component';
import { PayfastComponent } from './components/payfast/payfast.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'nav', component: NavBarComponent },
  { path: 'specials', component: SpecialsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'payfast', component: PayfastComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
