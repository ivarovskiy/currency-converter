import { Component, OnInit } from '@angular/core';
import { CurrencyService } from 'src/app/services/currency.service';
import { ICurrency } from 'src/app/types/currency';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  currencies: ICurrency[] = [];

  selectedCurrency: any;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getAllCurrencies().subscribe(currencies => {
      this.currencies = currencies;
    });
  }
}
