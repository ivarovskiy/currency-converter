import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { ICurrency } from 'src/app/types/currency';

type CurrentCurrency = { usdToUah: number; eurToUah: number };

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currency: CurrentCurrency = {
    usdToUah: 0, // Здесь должны быть реальные значения
    eurToUah: 0, // Здесь должны быть реальные значения
  };

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrencyRates().subscribe(currencies => {
      this.currency = currencies;
    });
  }
}
