import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiKey = environment.apiKey;
  private currencies = environment.apiSettings.currencies;
  private base_currency = environment.apiSettings.base_currency;

  private baseUrl = 'https://api.currencyapi.com/v3';

  constructor(private http: HttpClient) {}

  getCurrencyRates(): Observable<{
    //zaebis
    usdToUah: number;
    eurToUah: number;
  }> {
    // Используем timer для создания потока, который будет генерировать события каждые 5 минут
    return timer(0, 10 * 60 * 1000) // 10 минут = 10 * 60 * 1000 миллисекунд
      .pipe(
        startWith(0), // Начнем запрос сразу после создания Observable
        switchMap(() => {
          // Создаем параметры запроса, включая API ключ и настройки из файла конфигурации
          const params = new HttpParams()
            .set('apikey', this.apiKey)
            .set('currencies', this.currencies)
            .set('base_currency', this.base_currency);

          return this.http.get<any>(`${this.baseUrl}/latest`, { params });
        })
      )
      .pipe(
        switchMap(data => {
          console.log('data: ', data);
          // Выполняем несколько операций для конвертации данных
          const usdToUah = data.data.USD.value; // usd to uah
          const eurToUah = data.data.EUR.value; // eur to uah

          console.log('uds, eur: ', usdToUah, eurToUah);

          return new Observable<{
            usdToUah: number;
            eurToUah: number;
          }>(observer => {
            observer.next({ usdToUah, eurToUah });
            observer.complete();
          });
        })
      );
  }

  getAllCurrencies(): Observable<
    // zerbis
    { code: string; name: string }[]
  > {
    const url = `${this.baseUrl}/currencies?apikey=${this.apiKey}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        if (response && response.data) {
          const currencies = response.data;

          console.log('currency service: ', currencies);
          // Преобразовываем объект с валютами в массив с нужными полями
          return Object.keys(currencies).map(key => ({
            code: key,
            name: currencies[key].name,
          }));
        } else {
          return [];
        }
      })
    );
  }

  // https://api.currencyapi.com/v3/latest?apikey=cur_live_ReI1xPpkL1WYe7b6HqUhvqrfXNTcQjHZp0VSmnln&currencies=EUR%2CUSD%2CCAD&base_currency=UAH
}
