import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Product } from '../datatypes/product';


@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartKey = 'cart';
  private cartNum = 'itemCount';
  // placeholder = [];
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  private itemCount = new BehaviorSubject<number>(0);
  currentItemCount = this.itemCount.asObservable();

  // const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]'
  // )

  // useEffect(()=>{
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  loadCart() {
    const cartData = localStorage.getItem(this.cartKey);
    const itemCount = localStorage.getItem(this.cartNum);

    if (cartData && itemCount) {
      this.cartItemList = JSON.parse(cartData);
      this.itemCount.next(Number(itemCount));
    }
  }

  constructor() {
    this.itemCount = new BehaviorSubject<number>(0);
    this.loadCart();
  }


  getProducts() {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : this.cartItemList;
    // return this.productList.asObservable();
    // const productList = localStorage.getItem(this.cartItemList);
    // return productList ? JSON.parse(productList) : [];
    // return this.productList.asObservable();
  }
  itemCounts() {
    //Takes value from local storage
    const itemNum = localStorage.getItem(this.cartNum);
    // returns that items number
    return itemNum;
  }
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }


  addToCart(product: any) {
    const existingProductIndex = this.cartItemList.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
      const existingProduct = this.cartItemList[existingProductIndex];
      existingProduct.quantity += 1;
      existingProduct.total = existingProduct.price * existingProduct.quantity;
    } else {
      product.quantity = 1;
      product.total = product.price * product.quantity;
      this.cartItemList.push(product);
    }

    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItemList)); // Update local storage

    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.itemCount.next(this.itemCount.value + 1);
    localStorage.setItem(this.cartNum, String(this.itemCount.value));
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  removeCartItem(product: any) {
    const index: Product = this.cartItemList.indexOf(product);

    if (product > -1) {
      const removedProduct = this.cartItemList[product];
      const removedQuantity = removedProduct.quantity;

      if (removedQuantity > 1) {
        removedProduct.quantity -= 1;
        removedProduct.total = removedProduct.price * removedProduct.quantity; // Update the total based on the new quantity
      } else {
        this.cartItemList.splice(index, 1);
      }
      // localStorage.setItem('cart', JSON.stringify(this.cartItemList))

      this.productList.next(this.cartItemList);
      this.getTotalPrice();
      console.log(this.cartItemList);
      this.itemCount.next(this.itemCount.value - 1);

      localStorage.setItem(this.cartNum, String(this.itemCount.value));
      localStorage.setItem('cart', JSON.stringify(this.cartItemList))
      // localStorage.getItem(this.cartNum);

    }

  }

  // removeCartItem(product: any) {
  //   const index: number = this.cartItemList.indexOf(product);
  
  //   if (index > -1) {
  //     const removedProduct = this.cartItemList[index];
  //     const removedQuantity = removedProduct.quantity;
  
  //     if (removedQuantity > 1) {
  //       removedProduct.quantity -= 1;
  //       removedProduct.total = removedProduct.price * removedProduct.quantity; // Update the total based on the new quantity
  //     } else {
  //       this.cartItemList.splice(index, 1);
  //     }
  
  //     // Update local storage
  //     localStorage.setItem('cart', JSON.stringify(this.cartItemList));
  
  //     this.productList.next(this.cartItemList);
  //     this.getTotalPrice();
  //     console.log(this.cartItemList);
  //     this.itemCount.next(this.itemCount.value - 1);
  
  //     localStorage.setItem(this.cartNum, String(this.itemCount.value));
  //   }
  // }
  
  



  // removeCartItem(productID: any) {
  //   this.cartItemList = this.cartItemList.filter(data => data.id !==productID)
  //   localStorage.removeItem



  // }


  removeAllCart() {
    // this.cartItemList = [];
    // this.itemCount.next(0);
    // this.productList.next(this.cartItemList);

    localStorage.removeItem(this.cartKey);
    localStorage.setItem(this.cartNum, '0')
    this.itemCount.next(0);
    this.productList.next(this.cartItemList);
    this.cartItemList = [];

    return this.cartItemList;
  }

}