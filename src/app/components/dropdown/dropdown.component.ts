import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICurrencyRates } from 'src/app/types/currency';
import { ConvertService } from 'src/app/services/convert.service';
import { OpenExchangeRatesService } from 'src/app/services/open-exchange-rates.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  @Input() dropdownId = '';
  rates: ICurrencyRates[] = [];

  selectedCurrency: any;

  constructor(
    private convertService: ConvertService,
    private openExRates: OpenExchangeRatesService
  ) {}

  ngOnInit() {
    this.subscription = this.openExRates
      .getCurrencies()
      .subscribe(currencies => {
        this.rates = currencies;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onChange(event: any) {
    if (this.dropdownId === 'currencyFrom') {
      const { key } = event.value;
      this.convertService.setCurrencyFrom(key);
    } else if (this.dropdownId === 'currencyTo') {
      const { key } = event.value;
      this.convertService.setCurrencyTo(key);
    }
  }
}
