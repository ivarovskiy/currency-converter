import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environment/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class OpenExchangeRatesService {
  private apiKey = environment.apiKey;
  private baseUrl = 'https://openexchangerates.org/api';

  constructor(private http: HttpClient) {}

  getCurrencyRates(): Observable<any> {
    const params = new HttpParams().set('app_id', this.apiKey);
    return this.http.get<any>(`${this.baseUrl}/latest.json`, {
      params,
    });
  }

  getCurrencies(): Observable<any> {
    const params = new HttpParams().set('app_id', this.apiKey);
    return this.http.get<any>(`${this.baseUrl}/currencies.json`, {
      params,
    });
  }

  getConvertRates(
    from: string,
    to: string,
    value: string,
    flag: boolean
  ): Observable<number> {
    const params = new HttpParams().set('app_id', this.apiKey);
    return this.http
      .get<any>(`${this.baseUrl}/latest.json`, {
        params,
      })
      .pipe(
        map(response => {
          const rates = response.rates;

          if (rates && rates[from] && rates[to]) {
            let fromRate;
            let toRate;

            if (flag === true) {
              fromRate = rates[from];
              toRate = rates[to];
            } else {
              fromRate = rates[to];
              toRate = rates[from];
            }
            const convertedValue = parseFloat(value) * (toRate / fromRate);

            return +convertedValue.toFixed(3);
          } else {
            throw new Error('Currency rates not found');
          }
        })
      );
  }
}
