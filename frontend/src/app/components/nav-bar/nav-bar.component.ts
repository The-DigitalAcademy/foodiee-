import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  itemCount?: number;
  

  constructor(public cartService: CartService, private router: Router) { }
  ngOnInit(): void {
 
    this.cartService.currentItemCount.subscribe(itemCount => this.itemCount = itemCount);

  }

  findRoute(route: string) {
    return this.router.url.includes(route);
  }
}
