import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OpenExchangeRatesService } from './open-exchange-rates.service';

@Injectable({
  providedIn: 'root',
})
export class ConvertService {
  currencyFrom = '';
  currencyTo = '';
  amount = '';

  private dataSubject = new BehaviorSubject<{ [key: string]: any }>({});
  data$ = this.dataSubject.asObservable();

  updateData(formData: { [key: string]: any }) {
    const currentData = this.dataSubject.value;
    const updatedData = { ...currentData, ...formData };
    this.dataSubject.next(updatedData);
  }

  constructor(private openExRates: OpenExchangeRatesService) {}

  // Метод для установки валюты "из"
  setCurrencyFrom(currency: string) {
    this.currencyFrom = currency;
  }

  // Метод для получения валюты "из"
  getCurrencyFrom() {
    return this.currencyFrom;
  }

  // Метод для установки валюты "в"
  setCurrencyTo(currency: string) {
    this.currencyTo = currency;
  }

  // Метод для получения валюты "в"
  getCurrencyTo() {
    return this.currencyTo;
  }

  // Метод для установки суммы
  setAmount(amount: string) {
    if (amount === '') {
      this.amount === '';
    } else {
      this.amount = amount;
    }
  }

  // Метод для получения суммы
  getAmount(flag: boolean): Observable<number> {
    if (
      this.currencyFrom !== '' &&
      this.currencyTo !== '' &&
      this.amount !== ''
    ) {
      return this.openExRates.getConvertRates(
        this.currencyFrom,
        this.currencyTo,
        this.amount,
        flag
      );
    } else {
      return of(0); // Вернуть пустой Observable
    }
  }
}
