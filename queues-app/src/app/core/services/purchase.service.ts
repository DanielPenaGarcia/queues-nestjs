import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private counter: number = 0;
  private purchases: any[] = [];
  purchasesSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  public getCounter(): number {
    return this.counter;
  }

  addPurchase() {
    this.counter++;
    console.log('Purchase added', this.counter);
  }

  removePurchase() {
    this.counter--;
    console.log('Purchase removed', this.counter);
  }

  add(purchase: any) {
    this.purchases.push(purchase);
    this.purchasesSubject.next(true);
  }

  remove() {
    this.purchases.pop();
    if (this.purchases.length === 0) {
      this.purchasesSubject.next(false);
    }
  }

}
