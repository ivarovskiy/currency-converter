import { Component, OnDestroy, OnInit } from '@angular/core';
import { OpenExchangeRatesService } from 'src/app/services/open-exchange-rates.service';
import { interval, Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  usd = 0;
  eur = 0;
  date!: Date;

  constructor(private openExRates: OpenExchangeRatesService) {}

  ngOnInit() {
    // Сначала выполнить запрос
    this.updateCurrencyRates();

    // Затем повторять каждую минуту
    interval(60000)
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.openExRates.getCurrencyRates())
      )
      .subscribe(data => {
        this.usd = data.rates['USD'] * data.rates['UAH'];
        this.eur = data.rates['EUR'] * data.rates['UAH'];
        this.date = new Date(); // Обновляем текущую дату и время
      });
  }

  updateCurrencyRates() {
    this.openExRates.getCurrencyRates().subscribe(data => {
      this.usd = data.rates['USD'] * data.rates['UAH'];
      this.eur = data.rates['EUR'] * data.rates['UAH'];
      this.date = new Date(); // Обновляем текущую дату и время
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
